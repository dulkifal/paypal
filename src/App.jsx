import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./App.css";

function App() {
  const produts = [
    {
      id: 1,
      name: "How to be Great at Anything (Book Cover)",
      price: 100,
      image: "/ebook.jpg",
    },
    {
      id: 2,
      name: " HP Pavilion Gaming 10th Gen Intel Core i5 Processor 15.6-inch FHD Gaming Laptop (8GB/512GB SSD/Windows 10/NVIDIA GTX 1650 4GB/Shadow Black/2.3Kg), 15-dk1020TX",
      price: 550,
      image: "/laptop.webp",
    },
    {
      id: 3,
      name: "Apple iPhone 12 Pro Max 512GB - Pacific Blue",
      price: 400,
      image: "/phone.jpeg",
    },
    {
      id: 4,
      name: "Apple Watch Series 6 (GPS, 44mm) - Space Grey Aluminium Case with Black Sport Band",
      price: 250,
      image: "/watch.jpeg",
    },
    {
      id: 5,
      name: "Apple AirPods Pro",
      price: 50,
      image: "/airpods.jpeg",
    },
    {
      id: 6,
      name: "samsung galaxy s21 ultra",
      price: 650,
      image: "/samsung.jpeg",
    }

  ];

  return (
    <div className="App-body">
      <h1> Special offers </h1>

      <div className="rows">
      {produts.map((product) => (
          <div>
            <img height="300" src={product.image} alt={product.name} />
            <p>
              <span className="book-price">${product.price}</span>
            </p>
           
          
            <PayPalScriptProvider
              options={{ "client-id": import.meta.env.VITE_CLIENT_ID }}
            >
              <PayPalButtons
                style={{ layout: "horizontal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: product.price,
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  const name = details.payer.name.given_name;
                  alert("Transaction completed by " + name);
                }}
              />
            </PayPalScriptProvider>
            

          </div>
      ))}
      </div>
    </div>
  );
}

export default App;
