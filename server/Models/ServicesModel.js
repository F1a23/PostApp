import mongoose from "mongoose";

const ServicesSchema = mongoose.Schema({
  ServiceId: {
    type: String,
    required: true,
  },
  Service_name: {
    type: String,
    required: true,
  },
  ServiceInfo: {
    type: String,
    required: true,
  },
  Servicetype: {
    type: String,
    required: true,
  },
  Serviceprice: {
    type: String,
    required: true,
  },
});

const ServicesModel = mongoose.model("services", ServicesSchema);
export default ServicesModel;
