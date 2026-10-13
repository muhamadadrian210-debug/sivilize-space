export type ThemeId =
  | 'warm-cafe'
  | 'midnight-distro'
  | 'fresh-herbal'
  | 'pastel-beauty'
  | 'corporate-clean';

export type TemplateType = 'katalog' | 'layanan' | 'profil';

export type PlanTier = 'mikro' | 'pro' | 'bisnis';

export type BillingCycle = 'bulanan' | 'tahunan';

export type StoreSectionKey =
  | 'hero'
  | 'categories'
  | 'catalog'
  | 'about'
  | 'contact'
  | 'promo'
  | 'gallery'
  | 'testimonials'
  | 'faq';

export interface LayoutConfig {
  grid_columns_desktop: 2 | 3 | 4 | 'list';
  grid_columns_mobile: 1 | 2;
  spacing: 'compact' | 'normal' | 'spacious';
  card_style: 'border' | 'shadow' | 'flat';
  text_alignment?: 'left' | 'center' | 'right';
  heading_size?: 'small' | 'normal' | 'large' | 'huge';
  button_style?: 'pill' | 'rounded' | 'sharp' | 'block';
  badge_position?: 'top_left' | 'top_right' | 'inline';
  background_image?: string | null;
  background_opacity?: number;
  background_blur?: number;
  section_order: StoreSectionKey[];
  visible_sections: {
    hero: boolean;
    categories: boolean;
    catalog: boolean;
    about: boolean;
    contact: boolean;
    promo?: boolean;
    gallery?: boolean;
    testimonials?: boolean;
    faq?: boolean;
  };
  ecosystem_license_code?: string | null;
}

export interface CustomPage {
  id: string;
  store_id: string;
  title: string;
  slug: string;
  content: string;
  image_url?: string | null;
  is_published: boolean;
  paid_amount: number;
  payment_status: 'paid' | 'pending';
  mayar_invoice_id?: string | null;
  created_at: string;
}

export interface Store {
  id: string;
  slug: string;
  store_name: string;
  description: string | null;
  category: string;
  template_type: TemplateType;
  theme_id: ThemeId;
  owner_phone: string;
  pin_hash: string;
  banner_url: string | null;
  logo_url: string | null;
  opening_hours: string | null;
  address: string | null;
  google_maps_url: string | null;
  custom_domain: string | null;
  plan_tier?: PlanTier | null;
  layout_config?: LayoutConfig | null;
  custom_pages?: CustomPage[] | null;
  ecosystem_license_code?: string | null;
  is_paid?: boolean;
  billing_cycle?: BillingCycle | null;
  is_active: boolean;
  failed_login_attempts: number;
  lockout_until: string | null;
  expired_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  store_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_tag: string;
  is_available: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  store_id: string;
  order_id: string;
  amount: number;
  plan_tier: PlanTier;
  billing_cycle: BillingCycle;
  has_free_domain: boolean;
  claimed_free_domain: string | null;
  payment_status: 'pending' | 'settlement' | 'expire' | 'cancel' | 'deny';
  payment_type: string | null;
  midtrans_transaction_id: string | null;
  paid_at: string | null;
  created_at: string;
}

export interface SecurityBlacklist {
  id: string;
  ip_address: string | null;
  device_fingerprint: string | null;
  violating_slug: string | null;
  phone_number: string | null;
  violation_type: string;
  triggered_firewall_layer: number;
  honeypot_name: string | null;
  evidence_payload: string | null;
  banned_at: string;
}

export interface Database {
  public: {
    Tables: {
      stores: {
        Row: Store;
        Insert: Partial<Store> & Pick<Store, 'slug' | 'store_name' | 'owner_phone' | 'pin_hash'>;
        Update: Partial<Store>;
      };
      products: {
        Row: Product;
        Insert: Partial<Product> & Pick<Product, 'store_id' | 'name' | 'price'>;
        Update: Partial<Product>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: Partial<Subscription> & Pick<Subscription, 'store_id' | 'order_id' | 'amount' | 'plan_tier' | 'billing_cycle'>;
        Update: Partial<Subscription>;
      };
      security_blacklist: {
        Row: SecurityBlacklist;
        Insert: Partial<SecurityBlacklist> & Pick<SecurityBlacklist, 'violation_type' | 'triggered_firewall_layer'>;
        Update: Partial<SecurityBlacklist>;
      };
    };
  };
}
