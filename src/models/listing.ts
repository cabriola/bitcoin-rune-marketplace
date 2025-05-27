import mongoose, { Document, Schema } from 'mongoose';

export interface IListing extends Document {
  tokenId: string;
  price: number;
  quantity: number;
  sellerAddress: string;
  status: 'active' | 'sold' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new Schema<IListing>(
  {
    tokenId: {
      type: String,
      required: true,
      index: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    sellerAddress: {
      type: String,
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: ['active', 'sold', 'cancelled'],
      default: 'active',
      index: true
    }
  },
  {
    timestamps: true
  }
);

// Indexes
listingSchema.index({ createdAt: -1 });
listingSchema.index({ price: 1 });
listingSchema.index({ status: 1, createdAt: -1 });

export const Listing = mongoose.model<IListing>('Listing', listingSchema); 