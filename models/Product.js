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
exports.AvailableProductSchema = exports.ProductSchema = void 0;
const Yup = __importStar(require("yup"));
exports.ProductSchema = Yup.object({
    id: Yup.string(),
    title: Yup.string().required().default(""),
    description: Yup.string().default(""),
    price: Yup.number().positive().required().defined().default(0),
});
exports.AvailableProductSchema = exports.ProductSchema.shape({
    count: Yup.number().integer().min(0).required().defined().default(0),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlByb2R1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEseUNBQTJCO0FBRWQsUUFBQSxhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztJQUN0QyxFQUFFLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRTtJQUNoQixLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDMUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0lBQ3JDLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztDQUMvRCxDQUFDLENBQUM7QUFFVSxRQUFBLHNCQUFzQixHQUFHLHFCQUFhLENBQUMsS0FBSyxDQUFDO0lBQ3hELEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Q0FDckUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgWXVwIGZyb20gXCJ5dXBcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBQcm9kdWN0U2NoZW1hID0gWXVwLm9iamVjdCh7XHJcbiAgaWQ6IFl1cC5zdHJpbmcoKSxcclxuICB0aXRsZTogWXVwLnN0cmluZygpLnJlcXVpcmVkKCkuZGVmYXVsdChcIlwiKSxcclxuICBkZXNjcmlwdGlvbjogWXVwLnN0cmluZygpLmRlZmF1bHQoXCJcIiksXHJcbiAgcHJpY2U6IFl1cC5udW1iZXIoKS5wb3NpdGl2ZSgpLnJlcXVpcmVkKCkuZGVmaW5lZCgpLmRlZmF1bHQoMCksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGNvbnN0IEF2YWlsYWJsZVByb2R1Y3RTY2hlbWEgPSBQcm9kdWN0U2NoZW1hLnNoYXBlKHtcclxuICBjb3VudDogWXVwLm51bWJlcigpLmludGVnZXIoKS5taW4oMCkucmVxdWlyZWQoKS5kZWZpbmVkKCkuZGVmYXVsdCgwKSxcclxufSk7XHJcblxyXG5leHBvcnQgdHlwZSBQcm9kdWN0ID0gWXVwLkluZmVyVHlwZTx0eXBlb2YgUHJvZHVjdFNjaGVtYT47XHJcbmV4cG9ydCB0eXBlIEF2YWlsYWJsZVByb2R1Y3QgPSBZdXAuSW5mZXJUeXBlPHR5cGVvZiBBdmFpbGFibGVQcm9kdWN0U2NoZW1hPjtcclxuIl19