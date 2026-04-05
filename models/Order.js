"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.statusHistorySchema = exports.OrderItemSchema = exports.AddressSchema = void 0;
const Yup = __importStar(require("yup"));
const order_1 = require("../constants/order");
exports.AddressSchema = Yup.object({
    firstName: Yup.string().required().default(""),
    lastName: Yup.string().required().default(""),
    address: Yup.string().required().default(""),
    comment: Yup.string().default(""),
}).defined();
exports.OrderItemSchema = Yup.object({
    productId: Yup.string().required(),
    count: Yup.number().integer().positive().required(),
}).defined();
exports.statusHistorySchema = Yup.object({
    status: Yup.mixed().oneOf(Object.values(order_1.OrderStatus)).required(),
    timestamp: Yup.number().required(),
    comment: Yup.string().required(),
});
exports.OrderSchema = Yup.object({
    id: Yup.string().required(),
    items: Yup.array().of(exports.OrderItemSchema).defined(),
    address: exports.AddressSchema.required(),
    statusHistory: Yup.array().of(exports.statusHistorySchema).defined(),
}).defined();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJPcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBMkI7QUFDM0IsOENBQWlEO0FBRXBDLFFBQUEsYUFBYSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDdEMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0lBQzlDLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUM3QyxPQUFPLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDNUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0NBQ2xDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUlBLFFBQUEsZUFBZSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDeEMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbEMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUU7Q0FDcEQsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBSUEsUUFBQSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzVDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxFQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsbUJBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0lBQzdFLFNBQVMsRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ2xDLE9BQU8sRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFO0NBQ2pDLENBQUMsQ0FBQztBQUlVLFFBQUEsV0FBVyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDcEMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDM0IsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsdUJBQWUsQ0FBQyxDQUFDLE9BQU8sRUFBRTtJQUNoRCxPQUFPLEVBQUUscUJBQWEsQ0FBQyxRQUFRLEVBQUU7SUFDakMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsMkJBQW1CLENBQUMsQ0FBQyxPQUFPLEVBQUU7Q0FDN0QsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgWXVwIGZyb20gXCJ5dXBcIjtcclxuaW1wb3J0IHsgT3JkZXJTdGF0dXMgfSBmcm9tIFwiLi4vY29uc3RhbnRzL29yZGVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgQWRkcmVzc1NjaGVtYSA9IFl1cC5vYmplY3Qoe1xyXG4gIGZpcnN0TmFtZTogWXVwLnN0cmluZygpLnJlcXVpcmVkKCkuZGVmYXVsdChcIlwiKSxcclxuICBsYXN0TmFtZTogWXVwLnN0cmluZygpLnJlcXVpcmVkKCkuZGVmYXVsdChcIlwiKSxcclxuICBhZGRyZXNzOiBZdXAuc3RyaW5nKCkucmVxdWlyZWQoKS5kZWZhdWx0KFwiXCIpLFxyXG4gIGNvbW1lbnQ6IFl1cC5zdHJpbmcoKS5kZWZhdWx0KFwiXCIpLFxyXG59KS5kZWZpbmVkKCk7XHJcblxyXG5leHBvcnQgdHlwZSBBZGRyZXNzID0gWXVwLkluZmVyVHlwZTx0eXBlb2YgQWRkcmVzc1NjaGVtYT47XHJcblxyXG5leHBvcnQgY29uc3QgT3JkZXJJdGVtU2NoZW1hID0gWXVwLm9iamVjdCh7XHJcbiAgcHJvZHVjdElkOiBZdXAuc3RyaW5nKCkucmVxdWlyZWQoKSxcclxuICBjb3VudDogWXVwLm51bWJlcigpLmludGVnZXIoKS5wb3NpdGl2ZSgpLnJlcXVpcmVkKCksXHJcbn0pLmRlZmluZWQoKTtcclxuXHJcbmV4cG9ydCB0eXBlIE9yZGVySXRlbSA9IFl1cC5JbmZlclR5cGU8dHlwZW9mIE9yZGVySXRlbVNjaGVtYT47XHJcblxyXG5leHBvcnQgY29uc3Qgc3RhdHVzSGlzdG9yeVNjaGVtYSA9IFl1cC5vYmplY3Qoe1xyXG4gIHN0YXR1czogWXVwLm1peGVkPE9yZGVyU3RhdHVzPigpLm9uZU9mKE9iamVjdC52YWx1ZXMoT3JkZXJTdGF0dXMpKS5yZXF1aXJlZCgpLFxyXG4gIHRpbWVzdGFtcDogWXVwLm51bWJlcigpLnJlcXVpcmVkKCksXHJcbiAgY29tbWVudDogWXVwLnN0cmluZygpLnJlcXVpcmVkKCksXHJcbn0pO1xyXG5cclxuZXhwb3J0IHR5cGUgc3RhdHVzSGlzdG9yeSA9IFl1cC5JbmZlclR5cGU8dHlwZW9mIHN0YXR1c0hpc3RvcnlTY2hlbWE+O1xyXG5cclxuZXhwb3J0IGNvbnN0IE9yZGVyU2NoZW1hID0gWXVwLm9iamVjdCh7XHJcbiAgaWQ6IFl1cC5zdHJpbmcoKS5yZXF1aXJlZCgpLFxyXG4gIGl0ZW1zOiBZdXAuYXJyYXkoKS5vZihPcmRlckl0ZW1TY2hlbWEpLmRlZmluZWQoKSxcclxuICBhZGRyZXNzOiBBZGRyZXNzU2NoZW1hLnJlcXVpcmVkKCksXHJcbiAgc3RhdHVzSGlzdG9yeTogWXVwLmFycmF5KCkub2Yoc3RhdHVzSGlzdG9yeVNjaGVtYSkuZGVmaW5lZCgpLFxyXG59KS5kZWZpbmVkKCk7XHJcblxyXG5leHBvcnQgdHlwZSBPcmRlciA9IFl1cC5JbmZlclR5cGU8dHlwZW9mIE9yZGVyU2NoZW1hPjtcclxuIl19