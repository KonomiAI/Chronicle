import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  AlertTitle,
} from '@mui/material';

import { PostProductBody, VariantBodyDto, Product, Variant } from '../../types';
import { penniesToPrice } from '../../utils';
import Spacer from '../../components/spacer/Spacer';
import VariantManageDialog from './VariantCreate';
import { SaveBar } from '../../components';
import { FormInputField } from '../../components/form-inputs/FormInputField';
import { fastUnsafeObjectCompare } from '../../utils/compare-object';
import { usePermission } from '../../components/use-permission/UsePermissionContext';

interface ProductBaseProps {
  product?: Product;
  variants: Variant[] | VariantBodyDto[];
  onSave: (body: PostProductBody) => void;
  onSaveVariant: (variant: VariantBodyDto, variantId?: string) => void;
  isCreateVariantLoading?: boolean;
  hasCreateVariantError?: boolean;
  onDeleteVariant: (id: string) => void;
  isDeleteVariantLoading?: boolean;
  hasDeleteVariantError?: boolean;
  isLoading?: boolean;
}

const defaultProps = {
  product: undefined,
  isLoading: false,
  isCreateVariantLoading: false,
  hasCreateVariantError: false,
  isDeleteVariantLoading: false,
  hasDeleteVariantError: false,
};

const ProductBase: React.FC<ProductBaseProps> = ({
  variants,
  onSave,
  onSaveVariant,
  onDeleteVariant,
  isLoading,
  product,
  isCreateVariantLoading,
  hasCreateVariantError,
  isDeleteVariantLoading,
  hasDeleteVariantError,
}) => {
  const { canWrite } = usePermission();
  const [isVariantDialogOpen, setIsVariantDialogOpen] = useState(false);
  const [isSaveBarOpen, setIsSaveBarOpen] = useState(false);
  const [variantToEdit, setVariantToEdit] = useState<
    VariantBodyDto | Variant | undefined
  >();

  const initialValue = {
    name: product?.name ?? '',
    brand: product?.brand ?? '',
  };

  const { control, handleSubmit, reset, watch } = useForm<PostProductBody>({
    defaultValues: initialValue,
  });

  const currentValue = watch();

  useEffect(() => {
    if (!fastUnsafeObjectCompare(initialValue, currentValue)) {
      setIsSaveBarOpen(true);
    } else {
      setIsSaveBarOpen(false);
    }
  }, [currentValue]);

  useEffect(() => {
    reset({ name: product?.name ?? '', brand: product?.brand ?? '' });
  }, [product]);

  const generateTableRows = () =>
    variants.map((variant) => {
      const { description, price, barcode } = variant;
      return (
        <TableRow
          key={barcode}
          hover={canWrite}
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            if (!canWrite) {
              return;
            }
            setVariantToEdit(variant);
            setIsVariantDialogOpen(true);
          }}
        >
          <TableCell>{description}</TableCell>
          <TableCell>{penniesToPrice(price)}</TableCell>
          <TableCell>{barcode}</TableCell>
        </TableRow>
      );
    });

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormInputField
                name="name"
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                label="Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormInputField
                name="brand"
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                label="Brand"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Spacer size="lg" />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: '1em',
          gap: '5em',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Variants
        </Typography>
        <Box>
          <VariantManageDialog
            isOpen={isVariantDialogOpen}
            handleClose={() => setIsVariantDialogOpen(false)}
            handleSave={(variant: VariantBodyDto, vid?: string) =>
              onSaveVariant(variant, vid)
            }
            handleDelete={onDeleteVariant}
            variant={variantToEdit}
            isCreateVariantLoading={isCreateVariantLoading}
            hasCreateVariantError={hasCreateVariantError}
            isDeleteVariantLoading={isDeleteVariantLoading}
            hasDeleteVariantError={hasDeleteVariantError}
          />
          <Button
            variant="contained"
            onClick={() => {
              setVariantToEdit(undefined);
              setIsVariantDialogOpen(true);
            }}
            disabled={!canWrite}
          >
            Add New Variant
          </Button>
        </Box>
      </Box>
      {variants.length === 0 ? (
        <Alert severity="warning">
          <AlertTitle>At least one variant must be created.</AlertTitle>
          Please use the &quot;add&quot; button to add a variant
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Barcode</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{generateTableRows()}</TableBody>
          </Table>
        </TableContainer>
      )}
      <Spacer size="lg" />
      <SaveBar
        loading={isLoading}
        disabled={variants.length === 0}
        open={isSaveBarOpen}
        onSave={handleSubmit((data) => {
          onSave(data);
        })}
      />
    </>
  );
};

ProductBase.defaultProps = defaultProps;

export default ProductBase;
