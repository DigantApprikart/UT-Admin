import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';


import classes2 from './ProductTabContent.module.css';
import LocalFavourites from '../../../containers/SideTabs/LocalFavourites';
import SaladEssentials from '../../../containers/SideTabs/SaladEssentials';
import { CollectionsOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 523,
     marginTop:'80px'
    //position:'fixed',//this positions the categories and theproduct list and the pagination fixed
  },

  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  }



}));

//

export default function ProductTabContent() {

  const classes = useStyles();
  

  //categories
  const [category, setCategory] = useState([]);

  //jwt token from LocalStorage
  const token = reactLocalStorage.get('id_token');
  //get the product-category list
  const api = "/product-categories";
  //const jwt = reactLocalStorage.get('id_token');
  const jwtToken ='Bearer '+token;


  

//get the product category
  useEffect( () =>{

        axios.get(api, {
                headers: {
                'Authorization': jwtToken,
                'Accept' : '*/*',
                'Content-Type': 'application/json',
                'App-Token' : 'A14BC'
                  }
                })
                .then(productCategory =>{
                  setCategory(productCategory.data);
                  return productCategory;
                })
      },[jwtToken, api, token]);
  


  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  

  //storing the category id in the useState hook
  const [localStorage, setlocalStorage] = useState(null);
  

  const [CategoryId, setCategoryId] = useState(null);

  //storing the category name
  const [catName, setCatName] = useState(null);

  //storing the rank in the localStorage to be used while creating a product(AddProductsLink.js)
  const [Rank, setRank] = useState(1);

  const sendCategoryId =(id,counter, name, rank) =>{
    
    setCategoryId(id);
    setproductList(listOfProducts);
    setlocalStorage(id);
    setCatName(name);
    setRank(rank);
    
    setLocal();
   
    
  }





  const defaultList = <LocalFavourites cId={CategoryId} />;
                      

  const listOfProducts =  <SaladEssentials cId={CategoryId} />;
                          

  const [productList, setproductList] = useState(defaultList);

  //storing the category data in the LocalStorage

  const setLocal=()=>{
    reactLocalStorage.set('category_id', localStorage);
    reactLocalStorage.set('cat_name', catName);
    reactLocalStorage.set('rank', Rank);
  }


let indexNum = [];
let count = -1;

let catID = [];//for testing
console.log('catID', catID);
  return (
    <div className={classes.root}>
        
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Categories"
        className={classes.tabs}
      >

        {category.map((cat, index) =>{
          count++
          indexNum.push(count);
          catID.push(cat.id);//testing
          //onClick={function (){sendCategoryId(cat.id)}} 
            return(
                <Tab key={index} onClick={function (){sendCategoryId(cat.id, count, cat.name, cat.rank)}} className={classes2.tab} label={cat.name} {...anyProps(0)} style={{minWidth:'60px',marginRight:'10px',fontSize: '12px', fontWeight: '600'}}/>
              )
          })
          }

      </Tabs>

        {
          
          CategoryId !=null ?   indexNum.map(val =>{
                                        return(
                                            <TabPanel value={value} index={val}>
                                                  {productList}
                                              </TabPanel>
                                              
                                            )

                                      })

                          : indexNum.map(val =>{
                                        return(
                                          <TabPanel value={value} index={val}>
                                              {defaultList}
                                          </TabPanel>
                                              
                                            )

                                      }) 
                       
        }                  

     
    </div>
  );
}


//tab side content
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
        className={classes2.divScroller}
      >
      
        {value === index && (
          
          <Box p={3} >
              <Typography >{children}</Typography>  
          </Box>
        
          )
        }
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function anyProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }