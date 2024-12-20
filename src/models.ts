export interface IconProps {
  size?: number;
  color?: string;
  active?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number | string;
  description: string;
  images: string[];
  path: string;//main image
  video?: string 
}
