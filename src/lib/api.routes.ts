export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const API_ROUTES = {
  // Auth
  SIGN_IN: `${API_URL}/auth/sign_in`,

  // Permissions
  FIND_ALL_PERMISSIONS: `${API_URL}/role/permissions`,

  // Category
  CATEGORY: `${API_URL}/category`,
  CATEGORY_FIND_ALL_SOFT: `${API_URL}/category/soft`,
  CATEGORY_HARD_DELETE: `${API_URL}/category/hard_delete`,
  CATEGORY_SOFT_DELETE: `${API_URL}/category/soft_delete`,
  CATEGORY_RESTORE: `${API_URL}/category/restore`,

  // Category type
  CATEGORY_TYPE: `${API_URL}/category_type`,
  CATEGORY_TYPE_FIND_ALL_SOFT: `${API_URL}/category_type/soft`,
  CATEGORY_TYPE_HARD_DELETE: `${API_URL}/category_type/hard_delete`,
  CATEGORY_TYPE_SOFT_DELETE: `${API_URL}/category_type/soft_delete`,
  CATEGORY_TYPE_RESTORE: `${API_URL}/category_type/restore`,

  // Product type
  PRODUCT_TYPE: `${API_URL}/product_type`,
  PRODUCT_TYPE_FIND_ALL_SOFT: `${API_URL}/product_type/soft`,
  PRODUCT_TYPE_HARD_DELETE: `${API_URL}/product_type/hard_delete`,
  PRODUCT_TYPE_SOFT_DELETE: `${API_URL}/product_type/soft_delete`,
  PRODUCT_TYPE_RESTORE: `${API_URL}/product_type/restore`,
}