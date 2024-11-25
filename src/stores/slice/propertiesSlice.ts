import {
  type PayloadAction,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import type { RootState } from 'stores/types';
import type {
  GetAlPropertySearchField,
  GetAllProperties,
  GetAllPropertiesResult,
  GetAllPropertyPayload,
  GetAllPropertySortByOrder,
} from 'types/getAllProperties';
import type {
  DamageProtection,
  PropertyStatus,
  PropertyType,
} from 'types/properties';
import type { PropertyDetail } from 'types/propertyDetails';
import type { NetworkStatus, PaginationData } from 'types/shared';
import { api } from 'utilities/api';
import type { ManualListingAPIEntitySchema } from 'views/features/properties/addProperties/manualListing/ManualListingSchema';
import type { EditPropertyApiType } from 'views/features/properties/editProperty/schema';

// TODO: Refactor the logic for retrieving a single slice if it becomes too long, as
//it is currently handling all the properties. Consider splitting the slice into multiple smaller slices.

// This single slice is currently handling all the properties , archive properties , create and edit property

interface PropertyState {
  activeTable: 'archive' | 'published';
  tableProperty: {
    status: NetworkStatus;
    error: string | null;
    data?: GetAllPropertiesResult[];
    serverMetaData: GetAllProperties['result']['metaData'] | undefined;
    lastUpdated: string | null;
    paginationData: PaginationData;
    searchField?: GetAlPropertySearchField;
    sortByOrder?: GetAllPropertySortByOrder;
  };
  archiveProperty: {
    status: NetworkStatus;
    error: string | null;
    data?: GetAllPropertiesResult[];
    serverMetaData: GetAllProperties['result']['metaData'] | undefined;
    lastUpdated: string | null;
    paginationData: PaginationData;
    searchField?: GetAlPropertySearchField;
    sortByOrder?: GetAllPropertySortByOrder;
  };
  propertyType: {
    status: NetworkStatus;
    error: string | null;
    data?: PropertyType;
  };
  propertyStatus: {
    status: NetworkStatus;
    error: string | null;
    data?: PropertyStatus;
  };
  damageProtection: {
    status: NetworkStatus;
    error: string | null;
    data?: DamageProtection;
  };
  createProperty: {
    status: NetworkStatus;
    error: string | null;
    openModal: boolean;
    openSuccessModal: boolean;
  };
  editProperty: {
    openDrawer: boolean;
    selectedPropertyId: string | null | number;
    status: NetworkStatus;
    selectedProperty: {
      status: NetworkStatus;
      error: string | null;
      data: PropertyDetail | null;
    };
  };
}

const initialState: PropertyState = {
  activeTable: 'published',
  tableProperty: {
    status: 'idle',
    error: null,
    data: undefined,
    lastUpdated: null,
    serverMetaData: undefined,
    paginationData: {
      currentPage: 1,
      pageSize: 20,
    },
  },
  archiveProperty: {
    status: 'idle',
    error: null,
    data: undefined,
    lastUpdated: null,
    serverMetaData: undefined,
    paginationData: {
      currentPage: 1,
      pageSize: 20,
    },
  },
  propertyType: {
    status: 'idle',
    error: null,
    data: undefined,
  },
  propertyStatus: {
    status: 'idle',
    error: null,
    data: undefined,
  },
  damageProtection: {
    status: 'idle',
    error: null,
    data: undefined,
  },
  createProperty: {
    status: 'idle',
    error: null,
    openModal: false,
    openSuccessModal: false,
  },
  editProperty: {
    openDrawer: false,
    selectedPropertyId: null,
    status: 'idle',
    selectedProperty: {
      status: 'idle',
      error: null,
      data: null,
    },
  },
};

export const fetchPropertyType = createAsyncThunk(
  'properties/fetchPropertyType',
  async () => {
    const response = await api.get<PropertyType>(
      '/api/properties/get-property-type',
    );
    return response.data;
  },
);

export const fetchPropertyStatus = createAsyncThunk(
  'properties/fetchPropertyStatus',
  async () => {
    const response = await api.get<PropertyStatus>(
      '/api/properties/get-property-status',
    );
    return response.data;
  },
);

export const fetchDamageProtection = createAsyncThunk(
  'properties/fetchDamageProtection',
  async () => {
    const response = await api.get<DamageProtection>(
      '/api/properties/get-damage-protection',
    );
    return response.data;
  },
);

export const createManualProperty = createAsyncThunk(
  'properties/createManualProperty',
  async (property: ManualListingAPIEntitySchema) => {
    const response = await api.post('/api/properties/create', property);
    return response.data;
  },
);

export const fetchPropertyDetail = createAsyncThunk(
  'properties/fetchPropertyDetail',
  async (propertyId: string | number) => {
    const response = await api.get<PropertyDetail>(
      `/api/properties/${propertyId}`,
    );
    return response.data;
  },
);

export const updateProperty = createAsyncThunk(
  'properties/updateProperty',
  async ({
    property,
    propertyId,
  }: { property: EditPropertyApiType; propertyId: number | string }) => {
    const response = await api.put<PropertyDetail>(
      `/api/properties/${propertyId}`,
      property,
    );
    return response.data;
  },
);

export const fetchAllProperties = createAsyncThunk(
  'properties/fetchAllProperties',
  async (payload: GetAllPropertyPayload) => {
    const response = await api.post<GetAllProperties>(
      '/api/properties/get-all',
      payload,
    );
    return response.data;
  },
);

export const fetchArchiveProperties = createAsyncThunk(
  'properties/fetchArchiveProperties',
  async (payload: GetAllPropertyPayload) => {
    const response = await api.post<GetAllProperties>(
      '/api/properties/get-all',
      payload,
    );
    return response.data;
  },
);

export enum PropertyStatusEnum {
  PUBLISHED = 2,
  ARCHIVED = 1,
}

export const updatePropertyStatus = createAsyncThunk(
  'properties/updatePropertyStatus',
  async ({
    propertyId,
    propertyStatusId,
  }: { propertyId: number | string; propertyStatusId: PropertyStatusEnum }) => {
    const response = await api.post(
      `/api/properties/update-status/${propertyId}`,
      { property_status_id: propertyStatusId },
    );
    return response.data;
  },
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    openCreatePropertyModal: (state) => {
      state.createProperty.openModal = true;
    },
    closeCreatePropertyModal: (state) => {
      state.createProperty.openModal = false;
    },
    openCreatePropertySuccessModal: (state) => {
      state.createProperty.openSuccessModal = true;
    },
    closeCreatePropertySuccessModal: (state) => {
      state.createProperty.openSuccessModal = false;
    },
    openEditPropertyDrawer: (state, action: PayloadAction<string | number>) => {
      state.editProperty.openDrawer = true;
      state.editProperty.selectedPropertyId = action.payload;
    },
    closeEditPropertyDrawer: (state) => {
      state.editProperty.openDrawer = false;
      state.editProperty.selectedPropertyId = null;
    },
    setActiveTable: (state, action: PayloadAction<'archive' | 'published'>) => {
      state.activeTable = action.payload;
    },
    setPublishTablePaginationData: (
      state,
      action: PayloadAction<PaginationData>,
    ) => {
      state.tableProperty.paginationData = action.payload;
    },
    resetPropertySlice: () => {
      return initialState;
    },
    setPropertySearchField: (
      state,
      action: PayloadAction<GetAlPropertySearchField>,
    ) => {
      state.tableProperty.searchField = action.payload;
      // reset pagination data
      state.tableProperty.paginationData =
        initialState.tableProperty.paginationData;
      // reset last updated
      state.tableProperty.lastUpdated = null;
      // reset server meta data
      state.tableProperty.serverMetaData = undefined;
      // reset data
      state.tableProperty.data = undefined;
    },
    setPropertyArchiveSortByOrder: (
      state,
      action: PayloadAction<GetAllPropertySortByOrder>,
    ) => {
      state.archiveProperty.sortByOrder = action.payload;
      // reset pagination data
      state.archiveProperty.paginationData =
        initialState.archiveProperty.paginationData;
      // reset last updated
      state.archiveProperty.lastUpdated = null;
      // reset server meta data
      state.archiveProperty.serverMetaData = undefined;
      // reset data
      state.archiveProperty.data = undefined;
    },
    setPropertyArchiveSearchField: (
      state,
      action: PayloadAction<GetAlPropertySearchField>,
    ) => {
      state.archiveProperty.searchField = action.payload;
      // reset pagination data
      state.archiveProperty.paginationData =
        initialState.archiveProperty.paginationData;
      // reset last updated
      state.archiveProperty.lastUpdated = null;
      // reset server meta data
      state.archiveProperty.serverMetaData = undefined;
      // reset data
      state.archiveProperty.data = undefined;
    },
    setPropertySortByOrder: (
      state,
      action: PayloadAction<GetAllPropertySortByOrder>,
    ) => {
      state.tableProperty.sortByOrder = action.payload;
      // reset pagination data
      state.tableProperty.paginationData =
        initialState.tableProperty.paginationData;
      // reset last updated
      state.tableProperty.lastUpdated = null;
      // reset server meta data
      state.tableProperty.serverMetaData = undefined;
      // reset data
      state.tableProperty.data = undefined;
    },
    setPropertyArchivePaginationData: (
      state,
      action: PayloadAction<PaginationData>,
    ) => {
      state.archiveProperty.paginationData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Property Type
      .addCase(fetchPropertyType.pending, (state) => {
        state.propertyType.status = 'pending';
      })
      .addCase(fetchPropertyType.fulfilled, (state, action) => {
        state.propertyType.status = 'succeeded';
        state.propertyType.data = action.payload;
      })
      .addCase(fetchPropertyType.rejected, (state, action) => {
        state.propertyType.status = 'rejected';
        state.propertyType.error = action.error.message ?? 'Unknown Error';
      })
      // Property Status
      .addCase(fetchPropertyStatus.pending, (state) => {
        state.propertyStatus.status = 'pending';
      })
      .addCase(fetchPropertyStatus.fulfilled, (state, action) => {
        state.propertyStatus.status = 'succeeded';
        state.propertyStatus.data = action.payload;
      })
      .addCase(fetchPropertyStatus.rejected, (state, action) => {
        state.propertyStatus.status = 'rejected';
        state.propertyStatus.error = action.error.message ?? 'Unknown Error';
      })
      // Damage Protection
      .addCase(fetchDamageProtection.pending, (state) => {
        state.damageProtection.status = 'pending';
      })
      .addCase(fetchDamageProtection.fulfilled, (state, action) => {
        state.damageProtection.status = 'succeeded';
        state.damageProtection.data = action.payload;
      })
      .addCase(fetchDamageProtection.rejected, (state, action) => {
        state.damageProtection.status = 'rejected';
        state.damageProtection.error = action.error.message ?? 'Unknown Error';
      })
      // Create Manual Property
      .addCase(createManualProperty.pending, (state) => {
        state.createProperty.status = 'pending';
      })
      .addCase(createManualProperty.fulfilled, (state) => {
        state.createProperty.status = 'succeeded';
        state.createProperty.openModal = false;
        state.createProperty.openSuccessModal = true;
        state.tableProperty.data = [];
        state.archiveProperty.data = [];
        state.tableProperty.paginationData =
          initialState.tableProperty.paginationData;
        state.tableProperty.lastUpdated = new Date().toISOString();
      })
      .addCase(createManualProperty.rejected, (state, action) => {
        state.createProperty.status = 'rejected';
        state.createProperty.error = action.error.message ?? 'Unknown Error';
      })
      // Property Detail
      .addCase(fetchPropertyDetail.pending, (state) => {
        state.editProperty.selectedProperty.status = 'pending';
      })
      .addCase(fetchPropertyDetail.fulfilled, (state, action) => {
        state.editProperty.selectedProperty.status = 'succeeded';
        state.editProperty.selectedProperty.data = action.payload;
      })
      .addCase(fetchPropertyDetail.rejected, (state, action) => {
        state.editProperty.selectedProperty.status = 'rejected';
        state.editProperty.selectedProperty.error =
          action.error.message ?? 'Unknown Error';
      })
      // Update Property
      .addCase(updateProperty.pending, (state) => {
        state.editProperty.status = 'pending';
      })
      .addCase(updateProperty.fulfilled, (state) => {
        state.editProperty.selectedProperty.status = 'idle';
        state.editProperty.openDrawer = false;
        state.editProperty.selectedPropertyId = null;
        state.editProperty.selectedProperty.data = null;
        state.editProperty.selectedProperty.error = null;
        state.editProperty.status = 'succeeded';
        state.tableProperty.data = [];
        state.archiveProperty.data = [];
        state.tableProperty.paginationData =
          initialState.tableProperty.paginationData;
        state.tableProperty.lastUpdated = new Date().toISOString();
        state.archiveProperty.lastUpdated = new Date().toISOString();

        toast.success('Property updated successfully');
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.editProperty.status = 'rejected';
        state.editProperty.selectedProperty.error =
          action.error.message ?? 'Unknown Error';
        toast.error('Property update failed');
      })
      // Get All Properties
      .addCase(fetchAllProperties.pending, (state) => {
        state.tableProperty.status = 'pending';
      })
      .addCase(fetchAllProperties.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.result.properties)) {
          if (state.tableProperty.data) {
            state.tableProperty.data?.push(...action.payload.result.properties);
          } else {
            state.tableProperty.data = action.payload.result.properties;
          }
        }
        state.tableProperty.serverMetaData = action.payload.result.metaData;
        state.tableProperty.status = 'succeeded';
      })
      .addCase(fetchAllProperties.rejected, (state, action) => {
        state.tableProperty.status = 'rejected';
        state.tableProperty.error = action.error.message ?? 'Unknown Error';
      })
      // fetch Archive Property
      .addCase(fetchArchiveProperties.pending, (state) => {
        state.archiveProperty.status = 'pending';
      })
      .addCase(fetchArchiveProperties.fulfilled, (state, action) => {
        state.archiveProperty.status = 'succeeded';
        state.archiveProperty.data = action.payload.result.properties;
        state.archiveProperty.serverMetaData = action.payload.result.metaData;
      })
      .addCase(fetchArchiveProperties.rejected, (state, action) => {
        state.archiveProperty.status = 'rejected';
        state.archiveProperty.error = action.error.message ?? 'Unknown Error';
      })
      // Update Property Status
      .addCase(updatePropertyStatus.pending, (state) => {
        state.editProperty.status = 'pending';
      })
      .addCase(updatePropertyStatus.fulfilled, (state) => {
        state.editProperty.status = 'succeeded';
        state.editProperty.selectedProperty.status = 'idle';
        state.editProperty.openDrawer = false;
        state.editProperty.selectedPropertyId = null;
        state.editProperty.selectedProperty.data = null;
        state.editProperty.selectedProperty.error = null;
        state.editProperty.status = 'succeeded';
        state.tableProperty.data = [];
        state.archiveProperty.data = [];
        state.tableProperty.paginationData =
          initialState.tableProperty.paginationData;
        state.tableProperty.lastUpdated = new Date().toISOString();
        state.archiveProperty.lastUpdated = new Date().toISOString();
      })
      .addCase(updatePropertyStatus.rejected, (state) => {
        state.editProperty.status = 'rejected';
      });
  },
});

const { reducer, actions } = propertiesSlice;

export const {
  openCreatePropertyModal,
  closeCreatePropertyModal,
  openCreatePropertySuccessModal,
  closeCreatePropertySuccessModal,
  openEditPropertyDrawer,
  closeEditPropertyDrawer,
  setActiveTable,
  setPublishTablePaginationData,
  resetPropertySlice,
  setPropertySearchField,
  setPropertySortByOrder,
  setPropertyArchiveSearchField,
  setPropertyArchiveSortByOrder,
  setPropertyArchivePaginationData,
} = actions;

export const addPropertyType = (state: RootState) =>
  state.properties.propertyType.data?.result;
export const addPropertyStatus = (state: RootState) =>
  state.properties.propertyStatus.data?.result;
export const addDamageProtection = (state: RootState) =>
  state.properties.damageProtection.data?.result;

export default reducer;
