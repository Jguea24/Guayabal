// model/Product.ts
// Estructura alineada con ProductSerializer del backend
export interface Product {
  id: number;
  name: string;
  price: number;
  old_price?: number | null;
  description?: string | null;
  store_name?: string | null;
  rating?: number | null;
  reviews_count?: number | null;
  stock: number;
  image?: string | null;
  image_url?: string | null;
  category?: number | null;
  category_name?: string | null;
}
