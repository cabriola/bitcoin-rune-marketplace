import { Request, Response } from 'express';
import { Listing } from '../models/listing';
import { logger } from '../utils/logger';

export const createListing = async (req: Request, res: Response) => {
  try {
    const { tokenId, price, quantity, sellerAddress } = req.body;

    const listing = new Listing({
      tokenId,
      price,
      quantity,
      sellerAddress,
      status: 'active'
    });

    await listing.save();

    logger.info('New listing created:', { listingId: listing._id });

    res.status(201).json({
      success: true,
      data: listing
    });
  } catch (error) {
    logger.error('Error creating listing:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to create listing',
        code: 'CREATE_LISTING_ERROR'
      }
    });
  }
};

export const getListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listing.findById(req.params.id);
    
    if (!listing) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Listing not found',
          code: 'LISTING_NOT_FOUND'
        }
      });
    }

    res.json({
      success: true,
      data: listing
    });
  } catch (error) {
    logger.error('Error fetching listing:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch listing',
        code: 'FETCH_LISTING_ERROR'
      }
    });
  }
};

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const listings = await Listing.find({ status: 'active' });
    
    res.json({
      success: true,
      data: listings
    });
  } catch (error) {
    logger.error('Error fetching listings:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch listings',
        code: 'FETCH_LISTINGS_ERROR'
      }
    });
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    const { price, quantity } = req.body;
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Listing not found',
          code: 'LISTING_NOT_FOUND'
        }
      });
    }

    if (price) listing.price = price;
    if (quantity) listing.quantity = quantity;

    await listing.save();

    logger.info('Listing updated:', { listingId: listing._id });

    res.json({
      success: true,
      data: listing
    });
  } catch (error) {
    logger.error('Error updating listing:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to update listing',
        code: 'UPDATE_LISTING_ERROR'
      }
    });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        error: {
          message: 'Listing not found',
          code: 'LISTING_NOT_FOUND'
        }
      });
    }

    listing.status = 'cancelled';
    await listing.save();

    logger.info('Listing cancelled:', { listingId: listing._id });

    res.json({
      success: true,
      message: 'Listing cancelled successfully'
    });
  } catch (error) {
    logger.error('Error cancelling listing:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to cancel listing',
        code: 'CANCEL_LISTING_ERROR'
      }
    });
  }
}; 