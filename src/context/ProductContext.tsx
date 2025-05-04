
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type ProductCategory = 'structural-materials' | 'steel-pipes' | 'sheets-plates';

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  stock: number;
  description: string;
  image: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  product: Product;
};

export type Order = {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  status: 'requested' | 'approved' | 'rejected';
  date: string;
  originalTotal?: number; // For storing the original price before discount
};

type ProductContextType = {
  products: Product[];
  cartItems: CartItem[];
  orders: Order[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product, quantity: number) => void;
  updateCartItem: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  placeOrder: (userId: string, userName: string) => void;
  updateOrderStatus: (orderId: string, status: 'requested' | 'approved' | 'rejected') => void;
  findProductById: (id: string) => Product | undefined;
  updateOrderPrice: (orderId: string, newTotal: number) => void;
  updateProductImage: (productId: string, imageUrl: string) => void;
  updateProductStock: (productId: string, newStock: number) => void;
  updateProductPrice: (productId: string, newPrice: number) => void;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  cartItems: [],
  orders: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  addToCart: () => {},
  updateCartItem: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  placeOrder: () => {},
  updateOrderStatus: () => {},
  findProductById: () => undefined,
  updateOrderPrice: () => {},
  updateProductImage: () => {},
  updateProductStock: () => {},
  updateProductPrice: () => {},
});

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products from Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) {
          console.error('Error fetching products:', error);
          return;
        }
        
        if (data && data.length > 0) {
          // Transform data to match our Product type
          const formattedProducts: Product[] = data.map(item => ({
            id: item.id,
            name: item.name,
            category: item.category as ProductCategory,
            subcategory: item.subcategory,
            price: Number(item.price),
            stock: item.stock,
            description: item.description,
            image: item.image
          }));
          
          setProducts(formattedProducts);
        } else {
          // If no products found, use initial demo products
          console.log('No products found, loading demo products');
          loadInitialDemoProducts();
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fall back to demo products if there's an error
        loadInitialDemoProducts();
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  // Load cart items for authenticated user
  useEffect(() => {
    const fetchCartItems = async () => {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) return;
      
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:product_id (*)
        `)
        .eq('user_id', session.session.user.id);
      
      if (error) {
        console.error('Error fetching cart items:', error);
        return;
      }
      
      if (data) {
        const cartItems: CartItem[] = data.map(item => ({
          productId: item.product_id,
          quantity: item.quantity,
          product: {
            id: item.product.id,
            name: item.product.name,
            category: item.product.category as ProductCategory,
            subcategory: item.product.subcategory,
            price: Number(item.product.price),
            stock: item.product.stock,
            description: item.product.description,
            image: item.product.image
          }
        }));
        
        setCartItems(cartItems);
      }
    };
    
    fetchCartItems();
  }, []);

  // Initial demo products to use if database is empty
  const loadInitialDemoProducts = async () => {
    const initialProducts: Omit<Product, 'id'>[] = [
      {
        name: 'MS Angle 25x25x3mm',
        category: 'structural-materials',
        subcategory: 'Angles',
        price: 750.00,
        stock: 100,
        description: 'Mild steel angle, ideal for construction and fabrication.',
        image: '/placeholder.svg',
      },
      {
        name: 'MS Channel 75x40mm',
        category: 'structural-materials',
        subcategory: 'Channels',
        price: 1250.00,
        stock: 75,
        description: 'Standard mild steel channel for structural applications.',
        image: '/placeholder.svg',
      },
      {
        name: 'MS Flat 25x6mm',
        category: 'structural-materials',
        subcategory: 'Flats',
        price: 580.00,
        stock: 120,
        description: 'Flat mild steel bar for various construction needs.',
        image: '/placeholder.svg',
      },
      {
        name: 'MS I Beam 100x50mm',
        category: 'structural-materials',
        subcategory: 'I Beams',
        price: 1800.00,
        stock: 50,
        description: 'Standard I-beam for structural support in construction.',
        image: '/placeholder.svg',
      },
      {
        name: 'TMT Bar 8mm',
        category: 'structural-materials',
        subcategory: 'TMT Bars',
        price: 780.00,
        stock: 200,
        description: 'High-quality TMT reinforcement bar for concrete structures.',
        image: '/placeholder.svg',
      },
      {
        name: 'MS Round Pipe 1 inch',
        category: 'steel-pipes',
        subcategory: 'MS Round Pipes',
        price: 450.00,
        stock: 85,
        description: 'Standard mild steel round pipe for various applications.',
        image: '/placeholder.svg',
      },
      {
        name: 'MS Square Pipe 25x25mm',
        category: 'steel-pipes',
        subcategory: 'MS Square Pipes',
        price: 520.00,
        stock: 65,
        description: 'Square-section mild steel pipe for construction and furniture.',
        image: '/placeholder.svg',
      },
      {
        name: 'MS Rectangle Pipe 50x25mm',
        category: 'steel-pipes',
        subcategory: 'MS Rectangle Pipes',
        price: 580.00,
        stock: 70,
        description: 'Rectangular section mild steel pipe for construction needs.',
        image: '/placeholder.svg',
      },
      {
        name: 'HR Sheet 2mm',
        category: 'sheets-plates',
        subcategory: 'HR Sheets / Plates',
        price: 1050.00,
        stock: 40,
        description: 'Hot-rolled mild steel sheet for various industrial applications.',
        image: '/placeholder.svg',
      },
      {
        name: 'CR Sheet 1mm',
        category: 'sheets-plates',
        subcategory: 'CR Sheets',
        price: 1250.00,
        stock: 35,
        description: 'Cold-rolled steel sheet with smooth finish for precision applications.',
        image: '/placeholder.svg',
      },
      {
        name: 'GI Sheet 0.8mm',
        category: 'sheets-plates',
        subcategory: 'GI Sheets',
        price: 1450.00,
        stock: 30,
        description: 'Galvanized iron sheet with zinc coating for corrosion resistance.',
        image: '/placeholder.svg',
      },
      {
        name: 'Roofing Sheet 0.5mm',
        category: 'sheets-plates',
        subcategory: 'Roofing Sheets',
        price: 980.00,
        stock: 60,
        description: 'Corrugated roofing sheet for industrial and residential roofing.',
        image: '/placeholder.svg',
      },
    ];

    try {
      // Insert demo products into Supabase if no products exist
      for (const product of initialProducts) {
        const { error } = await supabase.from('products').insert([product]);
        if (error) {
          console.error('Error adding demo product:', error);
        }
      }

      // Fetch the products after inserting
      const { data, error } = await supabase.from('products').select('*');
      
      if (data && !error) {
        const formattedProducts: Product[] = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category as ProductCategory,
          subcategory: item.subcategory,
          price: Number(item.price),
          stock: item.stock,
          description: item.description,
          image: item.image
        }));
        
        setProducts(formattedProducts);
      }
    } catch (error) {
      console.error('Error setting up demo products:', error);
    }
  };

  // Product management functions
  const addProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();
      
      if (error) {
        console.error('Error adding product:', error);
        return;
      }
      
      if (data && data.length > 0) {
        const newProduct: Product = {
          id: data[0].id,
          name: data[0].name,
          category: data[0].category as ProductCategory,
          subcategory: data[0].subcategory,
          price: Number(data[0].price),
          stock: data[0].stock,
          description: data[0].description,
          image: data[0].image
        };
        
        setProducts(prev => [...prev, newProduct]);
      }
    } catch (error) {
      console.error('Error in addProduct:', error);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          category: updatedProduct.category,
          subcategory: updatedProduct.subcategory,
          price: updatedProduct.price,
          stock: updatedProduct.stock,
          description: updatedProduct.description,
          image: updatedProduct.image,
          updated_at: new Date().toISOString()
        })
        .eq('id', updatedProduct.id);
      
      if (error) {
        console.error('Error updating product:', error);
        return;
      }
      
      setProducts(products.map(product => 
        product.id === updatedProduct.id ? updatedProduct : product
      ));
    } catch (error) {
      console.error('Error in updateProduct:', error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting product:', error);
        return;
      }
      
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error in deleteProduct:', error);
    }
  };

  const findProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  // Cart management functions
  const addToCart = async (product: Product, quantity: number) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        toast.error('You must be logged in to add items to cart');
        return;
      }
      
      const userId = session.session.user.id;
      
      // Check if item already exists in cart
      const { data: existingItems } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', userId)
        .eq('product_id', product.id)
        .single();
      
      if (existingItems) {
        // Update quantity if item exists
        const newQuantity = existingItems.quantity + quantity;
        
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
          .eq('user_id', userId)
          .eq('product_id', product.id);
        
        if (error) {
          console.error('Error updating cart item:', error);
          return;
        }
        
        // Update local state
        setCartItems(prev => prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: newQuantity } 
            : item
        ));
      } else {
        // Add new item if it doesn't exist
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: userId,
            product_id: product.id,
            quantity: quantity
          });
        
        if (error) {
          console.error('Error adding item to cart:', error);
          return;
        }
        
        // Update local state
        setCartItems(prev => [...prev, { productId: product.id, quantity, product }]);
      }
    } catch (error) {
      console.error('Error in addToCart:', error);
    }
  };

  const updateCartItem = async (productId: string, quantity: number) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) return;
      
      const userId = session.session.user.id;
      
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: Math.max(1, quantity), updated_at: new Date().toISOString() })
        .eq('user_id', userId)
        .eq('product_id', productId);
      
      if (error) {
        console.error('Error updating cart item:', error);
        return;
      }
      
      setCartItems(
        cartItems.map(item => 
          item.productId === productId 
            ? { ...item, quantity: Math.max(1, quantity) } 
            : item
        )
      );
    } catch (error) {
      console.error('Error in updateCartItem:', error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) return;
      
      const userId = session.session.user.id;
      
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);
      
      if (error) {
        console.error('Error removing item from cart:', error);
        return;
      }
      
      setCartItems(cartItems.filter(item => item.productId !== productId));
    } catch (error) {
      console.error('Error in removeFromCart:', error);
    }
  };

  const clearCart = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) return;
      
      const userId = session.session.user.id;
      
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);
      
      if (error) {
        console.error('Error clearing cart:', error);
        return;
      }
      
      setCartItems([]);
    } catch (error) {
      console.error('Error in clearCart:', error);
    }
  };

  // Order management functions
  const placeOrder = async (userId: string, userName: string) => {
    if (cartItems.length === 0) return;

    try {
      // Calculate total
      const total = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity, 
        0
      );
      
      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          total,
          status: 'requested',
        })
        .select();
      
      if (orderError || !orderData) {
        console.error('Error creating order:', orderError);
        return;
      }
      
      const orderId = orderData[0].id;
      
      // Create order items
      for (const item of cartItems) {
        const { error: itemError } = await supabase
          .from('order_items')
          .insert({
            order_id: orderId,
            product_id: item.productId,
            quantity: item.quantity,
            price: item.product.price
          });
        
        if (itemError) {
          console.error('Error creating order item:', itemError);
          // Consider rolling back the order if item creation fails
        }
      }
      
      // Add order to local state
      const newOrder: Order = {
        id: orderId,
        userId,
        userName,
        items: [...cartItems],
        total,
        status: 'requested',
        date: new Date().toISOString(),
      };
      
      setOrders([...orders, newOrder]);
      
      // Clear cart after successful order placement
      await clearCart();
    } catch (error) {
      console.error('Error in placeOrder:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: 'requested' | 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId);
      
      if (error) {
        console.error('Error updating order status:', error);
        return;
      }
      
      // Update order in local state
      setOrders(
        orders.map(order => 
          order.id === orderId 
            ? { ...order, status } 
            : order
        )
      );
      
      // Update product stock if order is approved
      if (status === 'approved') {
        const orderToUpdate = orders.find(order => order.id === orderId);
        
        if (orderToUpdate) {
          for (const item of orderToUpdate.items) {
            const product = findProductById(item.productId);
            
            if (product) {
              const newStock = Math.max(0, product.stock - item.quantity);
              await updateProductStock(item.productId, newStock);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in updateOrderStatus:', error);
    }
  };

  const updateOrderPrice = async (orderId: string, newTotal: number) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ total: newTotal })
        .eq('id', orderId);
      
      if (error) {
        console.error('Error updating order price:', error);
        return;
      }
      
      setOrders(
        orders.map(order => 
          order.id === orderId 
            ? { 
                ...order, 
                originalTotal: order.originalTotal || order.total,
                total: newTotal 
              } 
            : order
        )
      );
    } catch (error) {
      console.error('Error in updateOrderPrice:', error);
    }
  };

  // Product enhancement functions
  const updateProductImage = async (productId: string, imageUrl: string) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ 
          image: imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId);
      
      if (error) {
        console.error('Error updating product image:', error);
        return;
      }
      
      setProducts(
        products.map(product => 
          product.id === productId 
            ? { ...product, image: imageUrl } 
            : product
        )
      );
    } catch (error) {
      console.error('Error in updateProductImage:', error);
    }
  };

  const updateProductStock = async (productId: string, newStock: number) => {
    const validatedStock = Math.max(0, newStock);
    
    try {
      const { error } = await supabase
        .from('products')
        .update({ 
          stock: validatedStock,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId);
      
      if (error) {
        console.error('Error updating product stock:', error);
        return;
      }
      
      setProducts(
        products.map(product => 
          product.id === productId 
            ? { ...product, stock: validatedStock } 
            : product
        )
      );
    } catch (error) {
      console.error('Error in updateProductStock:', error);
    }
  };

  const updateProductPrice = async (productId: string, newPrice: number) => {
    const validatedPrice = Math.max(0, newPrice);
    
    try {
      const { error } = await supabase
        .from('products')
        .update({ 
          price: validatedPrice,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId);
      
      if (error) {
        console.error('Error updating product price:', error);
        return;
      }
      
      setProducts(
        products.map(product => 
          product.id === productId 
            ? { ...product, price: validatedPrice } 
            : product
        )
      );
    } catch (error) {
      console.error('Error in updateProductPrice:', error);
    }
  };

  // Loading state component
  if (isLoading) {
    return <div>Loading products...</div>;
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        cartItems,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        findProductById,
        updateOrderPrice,
        updateProductImage,
        updateProductStock,
        updateProductPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
