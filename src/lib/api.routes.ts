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

  // Product
  PRODUCT: `${API_URL}/product`,
  PRODUCT_FIND_ALL_SOFT: `${API_URL}/product/soft`,
  PRODUCT_HARD_DELETE: `${API_URL}/product/hard_delete`,
  PRODUCT_SOFT_DELETE: `${API_URL}/product/soft_delete`,
  PRODUCT_RESTORE: `${API_URL}/product/restore`,
  PRODUCT_IMAGES: `${API_URL}/product/images`,

  // Deposit
  DEPOSIT: `${API_URL}/deposit`,
  DEPOSIT_FIND_ALL_SOFT: `${API_URL}/deposit/soft`,
  DEPOSIT_HARD_DELETE: `${API_URL}/deposit/hard_delete`,
  DEPOSIT_SOFT_DELETE: `${API_URL}/deposit/soft_delete`,
  DEPOSIT_RESTORE: `${API_URL}/deposit/restore`,

  // Characteristics
  CHARACTERISTICS: `${API_URL}/characteristics`,
  CHARACTERISTICS_FIND_ALL_SOFT: `${API_URL}/characteristics/soft`,
  CHARACTERISTICS_HARD_DELETE: `${API_URL}/characteristics/hard_delete`,
  CHARACTERISTICS_SOFT_DELETE: `${API_URL}/characteristics/soft_delete`,
  CHARACTERISTICS_RESTORE: `${API_URL}/characteristics/restore`,

  // Deposit Product
  DEPOSIT_PRODUCT: `${API_URL}/deposit_product`,
  DEPOSIT_PRODUCT_FIND_ALL_SOFT: `${API_URL}/deposit_product/soft`,
  DEPOSIT_PRODUCT_HARD_DELETE: `${API_URL}/deposit_product/hard_delete`,
  DEPOSIT_PRODUCT_SOFT_DELETE: `${API_URL}/deposit_product/soft_delete`,
  DEPOSIT_PRODUCT_RESTORE: `${API_URL}/deposit_product/restore`,

  // Income note
  INCOME_NOTE: `${API_URL}/income_note`
}