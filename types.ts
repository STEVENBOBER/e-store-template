export interface Product {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  size: Size;
  color: Color;
  images: Images[];
  reviews: Review[];
};

export interface Review {
  id: string
  reviewerName: string
  rating: string;
  comment: string;
  productId: string;
  createdAt: string | number;
}

export interface Images {
  id: string;
  url: string;
}


export interface Billboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: Billboard;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}