import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ProductCard2 from '../user/ProductCard2.tsx';
import LogoutIcon from '@mui/icons-material/Logout';
import aceite from '../img/aceite.jpg';
import alfombra from '../img/alfombra.jpg';
import aroma from '../img/aroma.jpg';
import cera from '../img/cera.jpg';

interface Product {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  image?: string;
  status: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data: Product[] = await response.json();

        const productsWithImages = data.map(product => {
          switch (product.id) {
            case 1:
              return { ...product, image: alfombra };
            case 2:
              return { ...product, image: aceite };
            case 3:
              return { ...product, image: aroma };
            case 4:
              return { ...product, image: cera };
            default:
              return product;
          }
        });

        setProducts(productsWithImages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    // Implementar lógica de cierre de sesión si es necesario
    // Por ejemplo, eliminar token de autenticación, etc.
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
            Catálogo del Auto Lavado Carvox
          </Typography>
          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ color: 'black' }}
          >
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} justifyContent="center" style={{ marginTop: '16px' }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard2
              product={product}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
