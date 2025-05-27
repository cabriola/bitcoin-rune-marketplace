import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateRequest } from '../middleware/validateRequest';
import { createListing, getListing, updateListing, deleteListing, getAllListings } from '../controllers/listing';

const router = Router();

// Get all listings
router.get('/', getAllListings);

// Get listing by ID
router.get(
  '/:id',
  param('id').isMongoId(),
  validateRequest,
  getListing
);

// Create new listing
router.post(
  '/',
  [
    body('tokenId').isString().notEmpty(),
    body('price').isNumeric().isFloat({ min: 0 }),
    body('quantity').isNumeric().isInt({ min: 1 }),
    body('sellerAddress').isEthereumAddress()
  ],
  validateRequest,
  createListing
);

// Update listing
router.put(
  '/:id',
  [
    param('id').isMongoId(),
    body('price').optional().isNumeric().isFloat({ min: 0 }),
    body('quantity').optional().isNumeric().isInt({ min: 1 })
  ],
  validateRequest,
  updateListing
);

// Delete listing
router.delete(
  '/:id',
  param('id').isMongoId(),
  validateRequest,
  deleteListing
);

export default router; 