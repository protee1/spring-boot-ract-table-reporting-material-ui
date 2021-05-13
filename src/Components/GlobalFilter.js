import React,{useState} from 'react'
import {useAsyncDebounce} from 'react-table'
import {Search} from '@material-ui/icons'
import {InputBase,makeStyles,fade} from '@material-ui/core'

const useStyles=makeStyles((theme)=>({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor:'#f1f4f7',
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
},

searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const GlobalFilter=({filter,setFilter})=>{
    const [value,setValue]=useState(filter)
    const onChange= useAsyncDebounce(value=>{
        setFilter(value|| undefined)
    },1000)
    const classes=useStyles()
    return (
 

        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={value || ''} onChange={(e)=>{
                setValue(e.target.value)  
                onChange(e.target.value)
              }}
            />
          </div>
 
    )
}
export default GlobalFilter

       
        {/** <span>
        <input value={filter || ''} onChange={(e)=> setFilter(e.target.value)}/>
        </span>*/}