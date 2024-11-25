import {
  type PayloadAction,
  type SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import type {
  GetAllDocumentsData,
  GetAllDocumentsResponse,
  // GetAllDocumentsSortByOrder,
} from 'types/getAllDocuments';
import type { NetworkStatus } from 'types/shared';
import { api } from 'utilities/api';
import { toastErrorDisplay } from 'utilities/toastErrorDisplay';
import type { AddDocumentApiSchema } from 'views/features/documentLinks/addDocumentLink/schema';
import type {
  AllProperties,
  DocumentResult,
  GetAllPropertiesResponse,
  GetDocumentByIdResponse,
  GetDocumentTypeResponse,
  PropertyFormType,
  PropertyType,
} from 'views/features/documentLinks/type';

// Async Thunk to fetch all documents
export const fetchDocuments = createAsyncThunk(
  'documents/fetchAll',
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async (queryParams: any) => {
    const response = await api.post<GetAllDocumentsResponse>(
      '/api/documents/get-all',
      queryParams,
    );
    return response.data;
  },
);

// Async Thunk to Delete a Document
export const deleteDocument = createAsyncThunk(
  'documents/deleteDocument',
  async (id: number) => {
    await api.delete(`/api/documents/${id}`, {}); // Sending the ID in the body
    return id; // Returning the deleted document ID to update state
  },
);

// Async Thunk for getting a document by ID
export const getDocumentById = createAsyncThunk(
  'documents/getById',
  async (id: number) => {
    const response = await api.get<GetDocumentByIdResponse>(
      `/api/documents/${id}`,
    );
    return response.data;
  },
);

// Async Thunk for getting a documentType
export const getDocumentTypes = createAsyncThunk('documents/type', async () => {
  const response = await api.get<GetDocumentTypeResponse>(
    '/api/documents/get-document-type',
  );
  return response.data;
});

// Async Thunk to edit a document by ID
export const editDocumentById = createAsyncThunk(
  'documents/editById',
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  async ({ id, data }: { id: number; data: any }) => {
    try {
      const response = await api.put(`/api/documents/${id}`, data); // Using PUT to update
      return response.data;
    } catch (error) {
      toastErrorDisplay(error);
      throw error;
    }
  },
);

//Async thunk for fetching and searching properties
export const getProperties = createAsyncThunk(
  'propeties/getAllProperties',
  async (propertiesForm: PropertyFormType) => {
    const response = await api.post<GetAllPropertiesResponse>(
      '/api/properties/get-all',
      {
        ...propertiesForm,
        propertyStatus: 'Publish',
      },
    );
    return response.data;
  },
);

export const getPropertyType = createAsyncThunk(
  'documents/getPropertyId',
  async () => {
    const response = await api.get('/api/documents/get-document-type');
    return response.data;
  },
);

// Async Thunk to create a document
export const createDocument = createAsyncThunk(
  'documents/create',
  async (documentData: AddDocumentApiSchema) => {
    const response = await api.post('/api/documents/create', documentData);
    return response.data;
  },
);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const resetCreateDocumentState = () => (dispatch: any) => {
  dispatch({
    type: 'RESET_CREATE_DOCUMENT_STATE',
  });
};

// Define the state type
interface DocumentState {
  documents: GetAllDocumentsData[];
  selectedDocument: DocumentResult;
  selectedDocumentLoading: boolean;
  loading: boolean;
  error: SerializedError | null;
  editSuccess: boolean;
  documentType: PropertyType[];
  documentTypeStatus: boolean;
  propertiesData: PropertyType[];
  propertyStatus: 'idle' | 'pending' | 'succeeded' | 'rejected';
  lastDocumentModified: string | null;
  create: {
    status: NetworkStatus;
    error: string | null;
    openModal: boolean;
    openSuccessModal: boolean;
  };
  edit: {
    status: NetworkStatus;
    selectedDocumentId: number | null;
    openDrawer: boolean;
    selectedDocument: GetAllDocumentsData | null;
  };
  delete: {
    selectedDocumentId: number | null;
    status: NetworkStatus;
    openModal: boolean;
  };
}

// Initial state
const initialState: DocumentState = {
  documents: [],
  selectedDocumentLoading: false,
  documentType: [],
  documentTypeStatus: false,
  selectedDocument: {
    id: 0,
    document_title: '',
    is_visible: false,
    is_terms_accepted: false,
    is_deleted: false,
    document_url: null,
    document_link: null,
    document_type_id: 0,
    documentType: {
      id: 0,
      name: '',
      created_at: '',
      updated_at: '',
    },
    propertyDocuments: [],
  },
  loading: false,
  error: null,
  editSuccess: false,
  propertiesData: [],
  propertyStatus: 'idle',
  lastDocumentModified: null,
  create: {
    status: 'idle',
    error: null,
    openModal: false,
    openSuccessModal: false,
  },
  edit: {
    status: 'idle',
    selectedDocumentId: null,
    openDrawer: false,
    selectedDocument: null,
  },
  delete: {
    selectedDocumentId: null,
    openModal: false,
    status: 'idle',
  },
};

// Slice
const documentSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    openDocumentCreateDocumentModal: (state) => {
      state.create.openModal = true;
    },
    closeDocumentCreateDocumentModal: (state) => {
      state.create.openModal = false;
    },
    openDocumentCreateDocumentSuccessModal: (state) => {
      state.create.openSuccessModal = true;
    },
    closeDocumentCreateDocumentSuccessModal: (state) => {
      state.create.openSuccessModal = false;
    },
    openDocumentEditDocumentDrawer: (state, action: PayloadAction<number>) => {
      state.edit.openDrawer = true;
      state.edit.selectedDocumentId = action.payload;
    },
    closeDocumentEditDocumentDrawer: (state) => {
      state.edit.openDrawer = false;
      state.edit.selectedDocumentId = null;
      state.edit.selectedDocument = null;
    },
    openDocumentDeleteDocumentModal: (state, action: PayloadAction<number>) => {
      state.delete.openModal = true;
      state.delete.selectedDocumentId = action.payload;
    },
    closeDocumentDeleteDocumentModal: (state) => {
      state.delete.openModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload.result.documents;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });

    // Delete
    builder
      .addCase(deleteDocument.pending, (state) => {
        state.delete.status = 'pending';
      })
      .addCase(deleteDocument.fulfilled, (state) => {
        state.delete.openModal = false;
        state.delete.status = 'succeeded';
        state.lastDocumentModified = Date.now().toString();
      })
      .addCase(deleteDocument.rejected, (state) => {
        state.delete.status = 'rejected';
      });

    // Get Document by ID
    builder
      .addCase(getDocumentById.pending, (state) => {
        state.selectedDocumentLoading = true;
        state.error = null;
      })
      .addCase(getDocumentById.fulfilled, (state, action) => {
        state.selectedDocumentLoading = false;
        state.selectedDocument = action.payload.result;
      })
      .addCase(getDocumentById.rejected, (state, action) => {
        state.selectedDocumentLoading = false;
        state.error = action.error;
      });

    // editDocumentById reducers
    builder
      .addCase(editDocumentById.pending, (state) => {
        state.edit.status = 'pending';
      })
      .addCase(editDocumentById.fulfilled, (state) => {
        state.edit.openDrawer = false;
        state.edit.selectedDocumentId = null;
        state.edit.selectedDocument = null;
        state.edit.status = 'idle';
        state.lastDocumentModified = Date.now().toString();
      })
      .addCase(editDocumentById.rejected, (state) => {
        state.edit.status = 'rejected';
      });

    //get assigned properties
    builder
      .addCase(getProperties.pending, (state) => {
        state.propertyStatus = 'pending';
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.propertyStatus = 'succeeded';
        state.propertiesData = action.payload.result.properties
          ?.filter(
            (property: AllProperties) =>
              property.propertyStatus.name === 'Publish',
          )
          .map((property: AllProperties) => {
            return {
              value: property.id,
              label: property.manualProperty.propertyName,
            };
          });
      })
      .addCase(getProperties.rejected, (state) => {
        state.propertyStatus = 'rejected';
      });

    // Reducers for createDocument
    builder
      .addCase(createDocument.pending, (state) => {
        state.create.status = 'pending';
        state.create.error = null;
      })
      .addCase(createDocument.fulfilled, (state) => {
        state.create.status = 'succeeded';
        state.lastDocumentModified = Date.now().toString();
        state.create.openModal = false;
        state.create.openSuccessModal = true;
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.create.status = 'rejected';
        toastErrorDisplay(action.error);
      })
      .addCase('RESET_CREATE_DOCUMENT_STATE', (state) => {
        state.create.status = 'idle';
      });
    //get All documentTypes
    builder
      .addCase(getDocumentTypes.pending, (state) => {
        state.documentTypeStatus = true;
      })
      .addCase(getDocumentTypes.fulfilled, (state, action) => {
        state.documentTypeStatus = false;
        state.documentType = action.payload.result.map((type) => {
          return { value: type.id, label: type.name };
        });
      })
      .addCase(getDocumentTypes.rejected, (state) => {
        state.documentTypeStatus = false;
      });
  },
});

export const {
  closeDocumentCreateDocumentModal,
  openDocumentCreateDocumentModal,
  openDocumentCreateDocumentSuccessModal,
  closeDocumentCreateDocumentSuccessModal,
  openDocumentEditDocumentDrawer,
  closeDocumentEditDocumentDrawer,
  openDocumentDeleteDocumentModal,
  closeDocumentDeleteDocumentModal,
} = documentSlice.actions;

export default documentSlice.reducer;
