import { menu_list } from '../assets/assets'
const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='flex flex-col gap-[20px]' id='explore-menu'>
<h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-green-900 ms-2 sm:ms-4 md:ms-6 lg:ms-8 md:mt-2'>  Explore Our Menu </h1>        
<p className='text-sm md:text-lg  text-gray-700 px-3 '>Discover a culinary journey with our diverse menu, crafted to delight every palate. From classic favorites to innovative new dishes, each item is prepared with the freshest local ingredients and a passion for flavor.</p>
        <div className="flex justify-between items-center gap-[25px] text-center mx-[20px] my-0 overflow-x-scroll hide-scrollbar">
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>{setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}} key={index} className='menu_list'>
                        <img src={item.menu_image} alt="" className={`w-[7.2vw] min-w-[80px] cursor-pointer rounded-[50%] transition duration-200 ease-in ${category===item.menu_name?"active":""}`}  />
                        <p className='mt-[10px] text-green-900 exploresizer cursor-pointer'>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr className='mx-0 my-[10px] border-none bg-gray-200 h-[2px]' />
    </div>
  )
}

export default ExploreMenu