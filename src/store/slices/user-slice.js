import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getFirestore, query, where, getDocs,addDoc } from 'firebase/firestore';

const initialState = {
    email:null,
    name:null,
    token:null,
    id:null,
    role:null,
};

export const addUserToDB = async (user) =>{
    const db = getFirestore();
    const userCollection = collection(db,'user');
    return await addDoc(userCollection,{
        id:user.id,
        email:user.email,
        name:user.name,
        role:user.role,
    });
}

export const fetchUser = createAsyncThunk("/fetchUsername", async (email) =>{
    const db = getFirestore();
    const userCollection = collection(db,'user');
    const queryUser = query(userCollection,where('email','==',email));
    const userDocs = await getDocs(queryUser);
    if(userDocs.size===0) return null;
    console.log(userDocs.docs[0].data().name)
    return {
        id:userDocs.docs[0].id,
        name:userDocs.docs[0].data().name,
        role:userDocs.docs[0].data().role,
        email:userDocs.docs[0].data().email,
    };
})




const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,action){
            state.id=action.payload.id;
            state.email=action.payload.email;
            state.name=action.payload.name;
            state.token=action.payload.token;
            state.role=action.payload.role;
            addUserToDB(action.payload);
        },
        getUser(state,action){
            state.id=action.payload.id;
            state.email=action.payload.email;
            state.name=action.payload.name;
            state.token=action.payload.token;
            state.role=action.payload.role;
        },
        removeUser(state){
            state.email=null;
            state.token=null;
            state.id=null;
            state.role=null;
            state.name=null;
        },
    },
    extraReducers:{
        [fetchUser.pending]:(state) =>{
            state.name=null
            state.role=null
        },
        [fetchUser.fulfilled]:(state,action) =>{
            state.name=action.payload.name
            state.role=action.payload.role
        },
        [fetchUser.rejected]:(state) =>{
            state.name=null
            state.role=null
        }
    }
})

export const {setUser,removeUser,getUser} = userSlice.actions;
export const isAuth = state => Boolean(state.user.email);
export default userSlice.reducer;