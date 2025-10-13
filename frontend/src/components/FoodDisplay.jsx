import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";
import { Search } from "lucide-react";
import FoodDetails from "./FoodDetails";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [searchData, setSearchData] = useState("");
  if (food_list.length === 0) {
    return (
      <div className="flex items-center justify-center mt-20">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div id="food-display" className="mt-[30px] ">
      {category === "All" && (
        <div className="flex justify-between w-[90%] mx-auto">
          <h2 className="fooddisplaysizer">Top Dishes</h2>

          <span className="relative flex items-center">
            <Search
              className="absolute left-3 text-gray-400 pointer-events-none"
              size={18}
            />
            <input
              type="search"
              name=""
              id="search"
              onChange={(e) => setSearchData(e.target.value)}
              className="py-1 pl-10 pr-3 focus:outline-none focus:ring-0 border border-gray-400 rounded-xl w-[80px] md:w-[150px]"
              placeholder=""
            />
          </span>
        </div>
      )}
      {category != "All" && <h2 className="fooddisplaysizer">{category}</h2>}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] gap-[30px] row-gap-[50px]">
        {food_list
          .filter((item) => {
            if (searchData === "") return true;

            return item.name.toLowerCase().includes(searchData.toLowerCase());
          })

          .map((item, index) => {
            if (category === "All" || category === item.category) {
              //set this in a variale

              return (
           
                
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
             
              );
            }
          })}
      </div>
    </div>
  );
};

export default FoodDisplay;
