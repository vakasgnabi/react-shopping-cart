// feature 1
import React from "react";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from "./data.json";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }
  sortProducts = (event) => {
    //impl
    const sort = event.target.value;

    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          this.state.sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : this.state.sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id > b._id
            ? 1
            : -1
        ),
    }));
  };

  filterProducts = (event) => {
    //impl
    if (event.target.value === "") {
      this.setState({ size: event.target.value, products: data.products });
      console.log("I am in if statement");
    } else {
      console.log("I am in else statement");
      console.log(this.state.size);
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    //console.log(this.state.sort);
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All rights are reserved</footer>
      </div>
    );
  }
}

export default App;
