import { z } from 'zod'

const userStatusSchema = z.union([
  z.literal('old'),
  z.literal('new'),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
])

const cowTypeSchema = z.union([
  z.literal('silver'),
  z.literal('gold'),
  z.literal('platinum'),
])

const userSchema = z.object({
  // Original fields from userSchema, updated based on provided example data structure
  id: z.string(),
  cowId: z.string(), // Corresponds to "Cow No." from CSV and `cowId` in your example object. This replaces the generic 'id'.
  firstName: z.string(), // Corresponds to "Customer Name"
  phoneNumber: z.string(), // Corresponds to "Mobile No."
  address: z.string(), // Corresponds to "Customer Address"
  
  // Existing fields from the original userSchema that were commented out
  // If these are not needed for *this specific data*, they can remain commented or be removed.
  // lastName: z.string().optional(),
  // username: z.string().optional(),
  // email: z.string().optional(),

  // Keeping status and role as optional string placeholders if they are part of a larger user context
  status: userStatusSchema.optional(),
  // role: userRoleSchema.optional(),

  // New fields from the provided example object:
  cowWeight: z.string(),          // Corresponds to "Cow Weight (kg)"
  estimatedSalePrice: z.string(), // Corresponds to "Estimated Sale Price per kg"
  actualSalePrice: z.string(),    // Corresponds to "Actual Sale Price per kg"
  totalPrice: z.string(),         // Corresponds to "Total Price"
  meatPercentage: z.string(),     // Corresponds to "Meat Percentage"
  fatPercentage: z.string(),      // Corresponds to "Fat Percentage"
  remarks: z.string(),            // Corresponds to "Remarks"

  cowType: cowTypeSchema,
  // Date fields
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

// You can now use this schema to validate your data objects:
// const validatedData = userSchema.parse(yourDataObject);
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)
