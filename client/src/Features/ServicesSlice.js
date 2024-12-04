import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  services: [],
  service: null,
  count: 0,
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,
};

// Thunks
export const addService = createAsyncThunk(
  "services/addService",
  async (newService, { rejectWithValue }) => {
    try {
      const response = await axios.post("/addService", newService);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to add service");
    }
  }
);

export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/manage");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch services");
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  "services/fetchServiceById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/getService/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch service");
    }
  }
);

export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/delete/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to delete service");
    }
  }
);

export const updateService = createAsyncThunk(
  "services/updateService",
  async (updatedService, { rejectWithValue }) => {
    try {
      const response = await axios.put("/update", updatedService);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to update service");
    }
  }
);

// Slice
const ServicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Service
      .addCase(addService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services.push(action.payload);
      })
      .addCase(addService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Services
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload.result;
        state.count = action.payload.count;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Service by ID
      .addCase(fetchServiceById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.service = action.payload.result;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Service
      .addCase(deleteService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = state.services.filter(
          (service) => service._id !== action.meta.arg
        );
        state.count = action.payload.count;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Service
      .addCase(updateService.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.services.findIndex(
          (service) => service.ServiceId === action.meta.arg.ServiceId
        );
        if (index !== -1) {
          state.services[index] = {
            ...state.services[index],
            ...action.meta.arg,
          };
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Export the reducer
export default ServicesSlice.reducer;
