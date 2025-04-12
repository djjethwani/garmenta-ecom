import apiClient from '@/lib/apiClient';
import { ProductData, Product } from '@/types';
import { catchError } from '@/utils/catchError';

const getProducts = async (fields: Record<string, any> = {}): Promise<Product[]> => {
  try {

    const url = `/products`;
    const { data } = await apiClient.get(url, { params: fields });
    return data.content;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const getProduct = async (id: string): Promise<ProductData> => {
  try {
    const url = `/products/${id}`;
    const { data } = await apiClient.get(url);
    const productData: ProductData = {
      product: data,
      relatedProducts: [],
    };
    return productData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

const ProductService = {
  getProducts,
  getProduct,
};

export default ProductService;
