import requests
import unittest

class TestAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://localhost:8080"

    @classmethod
    def tearDownClass(cls):
        # Limpiar base de datos después de ejecutar todas las pruebas
        clean_url = f"{cls.base_url}/productos"
        requests.delete(clean_url)
        
    def test_create_product_success(self):
        url = f"{self.base_url}/productos"
        product_data = {
            "nombre_producto": "Widget",
            "stock": 15,
            "precio": 299,
            "descripcion": "Un widget muy útil",
            "etiqueta": "útil"
        }
        response = requests.post(url, json=product_data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('Producto creado', response.text)

    def test_create_product_invalid_data(self):
        url = f"{self.base_url}/productos"
        invalid_product_data = {
            "nombre_producto": "", #CAMPO VACIO DE NOMBRE
            "stock": 15,
            "precio": 299,
            "descripcion": "Un widget muy útil",
            "etiqueta": "útil"
        }
        response = requests.post(url, json=invalid_product_data)
        self.assertEqual(response.status_code, 500)
        self.assertIn('Error al crear el producto', response.text)

    def test_delete_product_existing(self):
        url = f"{self.base_url}/productos/1"  # ID válido de un producto existente
        response = requests.delete(url)
        self.assertEqual(response.status_code, 200)
        self.assertIn('Producto eliminado', response.text)

    def test_delete_product_non_existing(self):
        url = f"{self.base_url}/productos/999"  # ID inexistente
        response = requests.delete(url)
        self.assertEqual(response.status_code, 500)
        self.assertIn('Error al eliminar el producto', response.text)

if __name__ == '__main__':
    unittest.main()