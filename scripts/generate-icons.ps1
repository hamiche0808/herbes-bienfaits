# Génère les icônes PWA du site (dessin en C# via System.Drawing).
# Usage : powershell -ExecutionPolicy Bypass -File scripts\generate-icons.ps1
$source = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

public static class IconGen
{
    static readonly Color Leaf700 = Color.FromArgb(47, 93, 58);     // #2F5D3A
    static readonly Color Leaf900 = Color.FromArgb(27, 53, 35);     // #1B3523
    static readonly Color Cream   = Color.FromArgb(247, 245, 238);  // #F7F5EE

    static GraphicsPath LeafPath(float boxX, float boxY, float boxW, float boxH)
    {
        // Feuille en amande : deux courbes de Bézier symétriques, pointe en haut.
        float cx = boxX + boxW / 2f;
        var path = new GraphicsPath();
        path.AddBezier(
            new PointF(cx, boxY),
            new PointF(boxX + boxW * 1.05f, boxY + boxH * 0.18f),
            new PointF(boxX + boxW * 1.05f, boxY + boxH * 0.82f),
            new PointF(cx, boxY + boxH));
        path.AddBezier(
            new PointF(cx, boxY + boxH),
            new PointF(boxX - boxW * 0.05f, boxY + boxH * 0.82f),
            new PointF(boxX - boxW * 0.05f, boxY + boxH * 0.18f),
            new PointF(cx, boxY));
        return path;
    }

    public static void Create(string file, int size, bool maskable, bool rounded)
    {
        using (var bmp = new Bitmap(size, size, PixelFormat.Format32bppArgb))
        using (var g = Graphics.FromImage(bmp))
        {
            g.SmoothingMode = SmoothingMode.AntiAlias;
            g.Clear(Color.Transparent);

            // Fond
            using (var bg = new SolidBrush(Leaf700))
            {
                if (maskable || !rounded)
                {
                    g.FillRectangle(bg, 0, 0, size, size);
                }
                else
                {
                    float r = size * 0.22f;
                    using (var path = new GraphicsPath())
                    {
                        path.AddArc(0, 0, 2 * r, 2 * r, 180, 90);
                        path.AddArc(size - 2 * r, 0, 2 * r, 2 * r, 270, 90);
                        path.AddArc(size - 2 * r, size - 2 * r, 2 * r, 2 * r, 0, 90);
                        path.AddArc(0, size - 2 * r, 2 * r, 2 * r, 90, 90);
                        path.CloseFigure();
                        g.FillPath(bg, path);
                    }
                }
            }

            // Feuille crème (zone sûre réduite pour les maskables)
            float leafW = maskable ? size * 0.42f : size * 0.52f;
            float leafH = maskable ? size * 0.56f : size * 0.68f;
            float lx = (size - leafW) / 2f;
            float ly = (size - leafH) / 2f - size * 0.04f;
            using (var leaf = LeafPath(lx, ly, leafW, leafH))
            using (var brush = new SolidBrush(Cream))
            {
                g.FillPath(brush, leaf);
            }

            // Nervure centrale
            using (var vein = new Pen(Leaf900, size * 0.022f))
            {
                vein.StartCap = LineCap.Round;
                vein.EndCap = LineCap.Round;
                g.DrawLine(vein, lx + leafW / 2f, ly + leafH * 0.02f, lx + leafW / 2f, ly + leafH * 0.98f);
            }

            bmp.Save(file, ImageFormat.Png);
        }
        Console.WriteLine("OK " + Path.GetFileName(file) + " (" + size + " px)");
    }
}
"@
Add-Type -TypeDefinition $source -ReferencedAssemblies System.Drawing

$outDir = Join-Path $PSScriptRoot "..\public\icons"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

[IconGen]::Create((Join-Path $outDir "icon-192.png"),          192, $false, $true)
[IconGen]::Create((Join-Path $outDir "icon-512.png"),          512, $false, $true)
[IconGen]::Create((Join-Path $outDir "icon-maskable-512.png"), 512, $true,  $false)
[IconGen]::Create((Join-Path $outDir "apple-touch-icon.png"),  180, $false, $false)

# Favicon : .ico multi-tailles (PNG encodes dans le conteneur ICO, standard Vista+)
$pngDir = Join-Path $env:TEMP "herbes-favicon"
New-Item -ItemType Directory -Force -Path $pngDir | Out-Null
$sizes = @(16, 32, 48)
$pngs = @()
foreach ($s in $sizes) {
    $f = Join-Path $pngDir ("favicon-" + $s + ".png")
    [IconGen]::Create($f, $s, $false, $true)
    $pngs += , @{ Size = $s; Bytes = [System.IO.File]::ReadAllBytes($f) }
}
$icoPath = Join-Path $PSScriptRoot "..\app\favicon.ico"
$ms = New-Object System.IO.MemoryStream
$bw = New-Object System.IO.BinaryWriter($ms)
$bw.Write([uint16]0); $bw.Write([uint16]1); $bw.Write([uint16]$pngs.Count)  # ICONDIR
$offset = 6 + 16 * $pngs.Count
foreach ($p in $pngs) {
    $bw.Write([byte]$p.Size)      # largeur
    $bw.Write([byte]$p.Size)      # hauteur
    $bw.Write([byte]0)            # palette
    $bw.Write([byte]0)            # reserve
    $bw.Write([uint16]1)          # plans
    $bw.Write([uint16]32)         # bpp
    $bw.Write([uint32]$p.Bytes.Length)
    $bw.Write([uint32]$offset)
    $offset += $p.Bytes.Length
}
foreach ($p in $pngs) { $bw.Write($p.Bytes) }
$bw.Flush()
[System.IO.File]::WriteAllBytes($icoPath, $ms.ToArray())
$bw.Close()
Write-Output "OK favicon.ico (multi-tailles 16/32/48)"

Write-Output "Icones generees"
