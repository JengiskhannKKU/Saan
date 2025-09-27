-- Create categories table for product categorization
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_th text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create products table for marketplace items
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  name_th text not null,
  description text,
  description_th text,
  price decimal(10,2) not null,
  currency text default 'THB',
  images text[] default '{}',
  stock_quantity integer default 0,
  is_active boolean default true,
  is_featured boolean default false,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create orders table for purchase tracking
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid references public.profiles(id) on delete cascade,
  total_amount decimal(10,2) not null,
  currency text default 'THB',
  status text default 'pending' check (status in ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  shipping_address jsonb,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order_items table for order details
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  quantity integer not null,
  unit_price decimal(10,2) not null,
  total_price decimal(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create favorites table for user wishlist
create table if not exists public.favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Enable Row Level Security on all tables
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.favorites enable row level security;

-- Categories policies (public read, admin write)
create policy "categories_select_all"
  on public.categories for select
  using (true);

-- Products policies
create policy "products_select_all"
  on public.products for select
  using (is_active = true);

create policy "products_insert_own"
  on public.products for insert
  with check (auth.uid() = seller_id);

create policy "products_update_own"
  on public.products for update
  using (auth.uid() = seller_id);

create policy "products_delete_own"
  on public.products for delete
  using (auth.uid() = seller_id);

-- Orders policies
create policy "orders_select_own"
  on public.orders for select
  using (auth.uid() = buyer_id);

create policy "orders_insert_own"
  on public.orders for insert
  with check (auth.uid() = buyer_id);

create policy "orders_update_own"
  on public.orders for update
  using (auth.uid() = buyer_id);

-- Order items policies
create policy "order_items_select_own"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.buyer_id = auth.uid()
    )
  );

create policy "order_items_insert_own"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.buyer_id = auth.uid()
    )
  );

-- Favorites policies
create policy "favorites_select_own"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "favorites_insert_own"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "favorites_delete_own"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- Create updated_at triggers for all tables
create trigger handle_categories_updated_at
  before update on public.categories
  for each row
  execute function public.handle_updated_at();

create trigger handle_products_updated_at
  before update on public.products
  for each row
  execute function public.handle_updated_at();

create trigger handle_orders_updated_at
  before update on public.orders
  for each row
  execute function public.handle_updated_at();

-- Insert sample categories
insert into public.categories (name, name_th, description) values
  ('Pottery', 'เครื่องปั้นดินเผา', 'Handcrafted pottery and ceramics'),
  ('Textiles', 'สิ่งทอ', 'Traditional Thai textiles and fabrics'),
  ('Wood Crafts', 'งานไม้', 'Handmade wooden items and furniture'),
  ('Jewelry', 'เครื่องประดับ', 'Traditional and modern jewelry'),
  ('Home Decor', 'ของตั้งแต่งบ้าน', 'Decorative items for home')
on conflict do nothing;
