-- Herbes & Bienfaits : schéma PostgreSQL (Supabase > SQL Editor > New query > Run)

create table public.herbs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  common_name text not null,
  scientific_name text not null,
  family text,
  summary text not null,
  parts_used text[] not null default '{}',
  active_principles text[] not null default '{}',
  harvest_months int[] not null default '{}'
    check (harvest_months <@ array[1,2,3,4,5,6,7,8,9,10,11,12]),
  image_url text,
  published boolean not null default false,
  updated_at timestamptz not null default now()
);

create table public.symptoms (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text not null,
  category text
);

create table public.benefits (
  id uuid primary key default gen_random_uuid(),
  herb_id uuid not null references public.herbs(id) on delete cascade,
  symptom_id uuid not null references public.symptoms(id) on delete restrict,
  description text not null,
  evidence_level text not null default 'traditionnel'
    check (evidence_level in ('traditionnel','monographie','etudes')),
  source_url text,
  unique (herb_id, symptom_id)
);

create table public.preparations (
  id uuid primary key default gen_random_uuid(),
  herb_id uuid not null references public.herbs(id) on delete cascade,
  method text not null check (method in ('infusion','decoction','cuisine','maceration','inhalation')),
  title text not null,
  instructions text not null,
  note text,
  sort_order int not null default 0
);

create table public.precautions (
  id uuid primary key default gen_random_uuid(),
  herb_id uuid not null references public.herbs(id) on delete cascade,
  kind text not null check (kind in ('contre-indication','interaction','precaution','effet-indesirable')),
  severity text not null default 'attention' check (severity in ('info','attention','danger')),
  description text not null,
  population text
);

create table public.tips (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null check (category in ('culture','conservation','quotidien')),
  title text not null,
  body text not null,
  herb_id uuid references public.herbs(id) on delete set null,
  published boolean not null default true
);

create index on public.benefits (herb_id);
create index on public.benefits (symptom_id);
create index on public.preparations (herb_id);
create index on public.precautions (herb_id);

-- Sécurité (RLS) : lecture publique, écriture réservée au tableau de bord
alter table public.herbs enable row level security;
alter table public.symptoms enable row level security;
alter table public.benefits enable row level security;
alter table public.preparations enable row level security;
alter table public.precautions enable row level security;
alter table public.tips enable row level security;

create policy "lecture herbes" on public.herbs for select using (published);
create policy "lecture symptoms" on public.symptoms for select using (true);
create policy "lecture tips" on public.tips for select using (published);
create policy "lecture benefits" on public.benefits for select
  using (exists (select 1 from public.herbs h where h.id = herb_id and h.published));
create policy "lecture preparations" on public.preparations for select
  using (exists (select 1 from public.herbs h where h.id = herb_id and h.published));
create policy "lecture precautions" on public.precautions for select
  using (exists (select 1 from public.herbs h where h.id = herb_id and h.published));
