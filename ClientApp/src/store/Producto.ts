import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { isNull } from 'util';


// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface ProductosState {
    isLoading: boolean;
    activo: boolean;
    productos: Productos[];
    filtroProductos: Productos[];
    producto: any;
}

export interface Productos {
    productoID: number;
    descripcion: string;
    precio: number;
    stock: number;
    categoriaID: number;
    categoria: any;
}



// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestProductosAction {
    type: 'REQUEST_PRODUCTOS';
}

interface ReceiveProductosAction {
    type: 'RECEIVE_PRODUCTOS';
    productos: Productos[];
}

interface CrearProductoAction {
    type: 'CREAR_PRODUCTO';
}

interface CrearProductoSuccessAction {
    type: 'CREAR_PRODUCTO_SUCCESS';
    producto: any;
}

interface editarProductoAction {
    type: 'EDITAR_PRODUCTO';
}

interface editarProductoSuccessAction {
    type: 'EDITAR_PRODUCTO_SUCCESS';
    producto: any;
}

interface eliminarProductoAction {
    type: 'ELIMINAR_PRODUCTO';
}

interface eliminarProductoSuccessAction {
    type: 'ELIMINAR_PRODUCTO_SUCCESS';
    producto: any;
}

interface filtrarProductoAction {
    type: 'FILTRAR_PRODUCTO';
    producto: any;
}

interface emptyProductoAction {
    type: 'EMPTY_PRODUCTO';
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestProductosAction | ReceiveProductosAction | CrearProductoAction | CrearProductoSuccessAction | editarProductoAction | editarProductoSuccessAction | eliminarProductoAction | eliminarProductoSuccessAction | filtrarProductoAction | emptyProductoAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestProductos: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        fetch(`api/producto/obtener`)
            .then(response => response.json() as Promise<Productos[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_PRODUCTOS', productos: data });
            }
            ).catch(error => console.error('Error:', error));
        dispatch({ type: 'REQUEST_PRODUCTOS' });
    },
    crearProducto: (producto: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        fetch(`api/producto/agregar`,{
            method: 'POST',
            body: JSON.stringify(producto),
            headers:{
              'Content-Type': 'application/json'
            }
        })
            .then(response => response.json() as Promise<Productos>)
            .then(
                (data) => {
                    dispatch({ type: 'CREAR_PRODUCTO_SUCCESS', producto: data });
                }
            ).catch(error => console.error('Error:', error));

        dispatch({ type: 'CREAR_PRODUCTO' });

    },
    editarProducto: (producto: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        console.log(JSON.stringify(producto))
        fetch(`api/producto/editar`,{
            method: 'PUT',
            body: JSON.stringify(producto),
            headers:{
              'Content-Type': 'application/json'
            }
        })
            .then(response => response.json() as Promise<Productos>)
            .then(
                (data) => {
                    console.log("editar",data)
                    dispatch({ type: 'EDITAR_PRODUCTO_SUCCESS', producto: data });
                }
            ).catch(error => console.error('Error:', error));

        dispatch({ type: 'CREAR_PRODUCTO' });

    },
    eliminarProducto: (ProductoID: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        fetch(`api/producto/eliminar/${ProductoID}`,{
            method: 'DELETE'
        })
            .then(response => response.json() as Promise<Productos>)
            .then(
                (data) => {
                    dispatch({ type: 'ELIMINAR_PRODUCTO_SUCCESS', producto: data });
                }
            ).catch(error => console.error('Error:', error));

        dispatch({ type: 'ELIMINAR_PRODUCTO' });

    },
    filtrarProducto: (query: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        dispatch({ type: 'FILTRAR_PRODUCTO', producto: query });
    },
    emptyProducto: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        dispatch({ type: 'EMPTY_PRODUCTO' });
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

 
const unloadedState: ProductosState = { productos: [], filtroProductos:[], isLoading: false, producto: null, activo: false };

export const reducer: Reducer<ProductosState> = (state: ProductosState | undefined, incomingAction: Action): ProductosState => {
    
    if (state === undefined) {
        console.log("entra aca");
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PRODUCTOS':
            return {
                productos: state.productos,
                filtroProductos: state.productos,
                isLoading: true,
                producto: state.producto,
                activo: state.activo
            };
        case 'RECEIVE_PRODUCTOS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                productos: action.productos,
                filtroProductos: action.productos,
                isLoading: false,
                producto: state.producto,
                activo: state.activo
            };
        case 'CREAR_PRODUCTO':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                productos: state.productos,
                filtroProductos: state.productos,
                isLoading: false,
                producto: state.producto,
                activo: state.activo
            };
        case 'CREAR_PRODUCTO_SUCCESS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                productos: state.productos,
                filtroProductos: state.productos,
                isLoading: false,
                producto: action.producto,
                activo: state.activo
            };
        case 'EDITAR_PRODUCTO':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                productos: state.productos,
                filtroProductos: state.productos,
                isLoading: false,
                producto: state.producto,
                activo: state.activo
            };
        case 'EDITAR_PRODUCTO_SUCCESS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                productos: state.productos,
                filtroProductos: state.productos,
                isLoading: false,
                producto: action.producto,
                activo: state.activo
            };
        case 'ELIMINAR_PRODUCTO':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                productos: state.productos,
                filtroProductos: state.productos,
                isLoading: false,
                producto: state.producto,
                activo: state.activo
            };
        case 'ELIMINAR_PRODUCTO_SUCCESS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                productos: state.productos,
                filtroProductos: state.productos,
                isLoading: false,
                producto: null,
                activo: state.activo
            };
        case 'FILTRAR_PRODUCTO':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            let new_productos=state.productos.filter((x : any)=>{
                let num_id = x.productoID
                return (x.descripcion.toLowerCase().indexOf(action.producto.toLowerCase())>=0 || num_id.toString().indexOf(action.producto)>=0)
            })
            return {
                productos: state.productos,
                filtroProductos: new_productos,
                isLoading: state.isLoading,
                producto: state.producto,
                activo: !state.activo
            };
        case 'EMPTY_PRODUCTO':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            return {
                productos: state.productos,
                filtroProductos: state.productos,
                isLoading: false,
                producto: null,
                activo: !state.activo
            };
    }

    return state;
};