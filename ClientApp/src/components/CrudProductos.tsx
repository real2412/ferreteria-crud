import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {actionCreators} from '../store/Producto';
import { ApplicationState } from '../store';
import FormProducto from './FormProducto'


export default () => {
    const dispatch = useDispatch();
    const [crear, setCrear] = useState(false);
    const [editar, setEditar] = useState(false);
    const [textBuscar, setTextBuscar] = useState('');
    const [productoForm, setProductoForm] = useState({});
    const filtroProductos = useSelector((state: ApplicationState) => {
        if(state.productos!==undefined){
            return state.productos.filtroProductos
        }else{
            return []
        }
    });
    
    const isLoading = useSelector((state: ApplicationState) => {
        if(state.productos!=undefined){
            return state.productos.isLoading
        }else{
            return false
        }
    });

    const activo = useSelector((state: ApplicationState) => {
        if(state.productos!=undefined){
            return state.productos.activo
        }else{
            return false
        }
    });

    const producto = useSelector((state: ApplicationState) => {
        if(state.productos!=undefined){
            return state.productos.producto
        }else{
            return false
        }
    });

    useEffect(()=>{
        if(textBuscar===""){
            dispatch(actionCreators.requestProductos())
        }
        setCrear(false)
    },[producto, activo]);

    const handleEditar = (obj: any) => {
        setProductoForm(obj)
        setCrear(true)
        setEditar(true)
    }

    const handleEliminar = (obj: any) => {
        console.log("eliminar", obj.productoID)
        dispatch(actionCreators.eliminarProducto(obj.productoID))
    }

    const _handleBuscar = (e:React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement;
        setTextBuscar(target.value)
        dispatch(actionCreators.filtrarProducto(target.value))
    }

    return (
        <div>   
            <h3>CRUD de Productos   </h3>
            {
                crear?
                    <FormProducto editar={editar} producto={productoForm} />
                :
                    <button 
                        className="btn btn-primary mb-3" 
                        type="button"
                        onClick={()=>{setCrear(true); setEditar(false); setProductoForm({});}}
                    >Crear Producto</button>
            }
            <div className="row">
                <div className="col-3 mb-3 d-flex">
                    <label>Buscar:</label>
                    <input 
                        type="search" 
                        className="form-control ds-input"
                        onChange={(e)=>_handleBuscar(e)}
                    />    
                </div>
                <div className="col-12">
                    <table className="table table-dark">
                        <thead>
                            <tr>
                            <th scope="col">Codigo</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading?
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                :
                                    filtroProductos.length>0?
                                        filtroProductos.map((x)=>{
                                            return (
                                                <tr key={x.productoID}>
                                                    <th scope="row">{x.productoID}</th>
                                                    <td>{x.descripcion}</td>
                                                    <td>{x.categoria.nombre}</td>
                                                    <td>{x.precio}</td>
                                                    <td>{x.stock}</td>
                                                    <td><button 
                                                            className="btn btn-primary"
                                                            onClick={()=>handleEditar(x)}
                                                        >
                                                            Editar
                                                        </button>
                                                    </td>
                                                    <td><button 
                                                            className="btn btn-danger"
                                                            onClick={()=>handleEliminar(x)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    :
                                        <tr>No hay Productos</tr>        

                            }
                            
                            
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    );
}