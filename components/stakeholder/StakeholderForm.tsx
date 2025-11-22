'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import {
  StakeholderFormData,
  StakeholderSchema,
} from '@/schema/stakeholder.schema';
import { useStakeholderStore } from '@/store/stakeholder-store';
import {
  StakeholderType,
  KriteriaInterestStakeholderEnum,
} from '@/types/stakeholder';
import { Field, FieldLabel } from '../ui/field';

type StakeholderFormProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode?: 'create' | 'read' | 'edit';
  data?: StakeholderType | null;
};

export function StakeholderForm({
  open,
  onOpenChange,
  mode = 'create',
  data = null,
}: StakeholderFormProps) {
  const form = useForm<StakeholderFormData>({
    resolver: zodResolver(StakeholderSchema),
    defaultValues: {
      nama_stakeholder: '',
      kontak_stakeholder: '',
      alamat_stakeholder: '',
      kelurahan: '',
      kecamatan: '',
      skoring_power_stakeholder: 0,
      skoring_interest_stakeholder: 0,
      kegiatan_stakeholder: '',
      tindak_lanjut_stakeholder: '',
      kriteria_interest_stakeholder: undefined,
      kategori_stakeholder: '-',
      strategi_stakeholder: '-',
      kriteria_influence_stakeholder: '-',
      kriteria_involvement_stakeholder: '-',
      keterikatan_stakeholder: '-',
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const addStakeholder = useStakeholderStore((s) => s.addStakeholder);
  const updateStakeholder = useStakeholderStore((s) => s.updateStakeholder);
  const interestValue = watch('kriteria_interest_stakeholder');
  const disabled = mode === 'read';

  useEffect(() => {
    if (data && mode !== 'create') {
      // Set basic fields
      setValue('nama_stakeholder', data.nama_stakeholder);
      setValue('kontak_stakeholder', data.kontak_stakeholder);
      setValue('alamat_stakeholder', data.alamat_stakeholder);
      setValue('kelurahan', data.kelurahan);
      setValue('kecamatan', data.kecamatan);
      setValue('skoring_power_stakeholder', data.skoring_power_stakeholder);
      setValue(
        'skoring_interest_stakeholder',
        data.skoring_interest_stakeholder
      );
      setValue('kegiatan_stakeholder', data.kegiatan_stakeholder);
      setValue('tindak_lanjut_stakeholder', data.tindak_lanjut_stakeholder);
      setValue('kategori_stakeholder', data.kategori_stakeholder || '-');
      setValue('strategi_stakeholder', data.strategi_stakeholder || '-');
      setValue(
        'kriteria_interest_stakeholder',
        data.kriteria_interest_stakeholder || undefined
      );
      setValue(
        'kriteria_influence_stakeholder',
        data.kriteria_influence_stakeholder || '-'
      );
      setValue(
        'kriteria_involvement_stakeholder',
        data.kriteria_involvement_stakeholder || '-'
      );
      setValue('keterikatan_stakeholder', data.keterikatan_stakeholder || '-');
    } else if (mode === 'create') {
      form.reset();
    }
  }, [mode, data, form, setValue]);

  const onSubmit = (formData: StakeholderFormData) => {
    const submissionData: StakeholderType = {
      id: mode === 'edit' && data ? data.id : crypto.randomUUID(),
      kategori_stakeholder: formData.kategori_stakeholder,
      strategi_stakeholder: formData.strategi_stakeholder,
      kriteria_interest_stakeholder: formData.kriteria_interest_stakeholder
        ? (formData.kriteria_interest_stakeholder as KriteriaInterestStakeholderEnum)
        : undefined,
      kriteria_influence_stakeholder: formData.kriteria_influence_stakeholder,
      kriteria_involvement_stakeholder:
        formData.kriteria_involvement_stakeholder,
      keterikatan_stakeholder: formData.keterikatan_stakeholder,
      nama_stakeholder: formData.nama_stakeholder,
      kontak_stakeholder: formData.kontak_stakeholder,
      alamat_stakeholder: formData.alamat_stakeholder,
      kelurahan: formData.kelurahan,
      kecamatan: formData.kecamatan,
      skoring_power_stakeholder: formData.skoring_power_stakeholder,
      skoring_interest_stakeholder: formData.skoring_interest_stakeholder,
      kegiatan_stakeholder: formData.kegiatan_stakeholder,
      tindak_lanjut_stakeholder: formData.tindak_lanjut_stakeholder,
    };

    if (mode === 'edit') {
      updateStakeholder(submissionData);
    } else {
      addStakeholder(submissionData);
    }

    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[85vh] overflow-y-auto sm:max-w-[60vw]'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create'
              ? 'Tambah Stakeholder'
              : mode === 'edit'
                ? 'Edit Stakeholder'
                : 'Detail Stakeholder'}
          </DialogTitle>
        </DialogHeader>

        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {/* GRID INPUTS */}
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {/* Nama Stakeholder */}
            <div className='flex flex-col gap-1'>
              <Field className='flex items-start gap-3'>
                <FieldLabel htmlFor='nama_stakeholder'>
                  Nama Stakeholder
                </FieldLabel>
                <Input
                  type='text'
                  {...register('nama_stakeholder')}
                  id='nama_stakeholder'
                  placeholder='Nama Stakeholder'
                  required
                  disabled={disabled}
                />
              </Field>
              {errors.nama_stakeholder && (
                <span className='text-sm text-red-600'>
                  {errors.nama_stakeholder.message}
                </span>
              )}
            </div>
            {/* Kontak Stakeholder */}
            <div className='flex flex-col gap-1'>
              <Field className='flex items-start gap-3'>
                <FieldLabel htmlFor='kontak_stakeholder'>
                  Kontak Stakeholder
                </FieldLabel>
                <Input
                  type='text'
                  {...register('kontak_stakeholder')}
                  id='kontak_stakeholder'
                  placeholder='Kontak Stakeholder'
                  required
                  disabled={disabled}
                />
              </Field>
              {errors.kontak_stakeholder && (
                <span className='text-sm text-red-600'>
                  {errors.kontak_stakeholder.message}
                </span>
              )}
            </div>
            {/* Kecamatan */}
            <div className='flex flex-col gap-1'>
              <Field className='flex items-start gap-3'>
                <FieldLabel htmlFor='kelurahan'>Kelurahan</FieldLabel>
                <Input
                  type='text'
                  {...register('kelurahan')}
                  id='kelurahan'
                  placeholder='Kelurahan'
                  required
                  disabled={disabled}
                />
              </Field>
              {errors.kelurahan && (
                <span className='text-sm text-red-600'>
                  {errors.kelurahan.message}
                </span>
              )}
            </div>
            {/* Kelurahan */}
            <div className='flex flex-col gap-1'>
              <Field className='flex items-start gap-3'>
                <FieldLabel htmlFor='kecamatan'>Kecamatan</FieldLabel>
                <Input
                  type='text'
                  {...register('kecamatan')}
                  id='kecamatan'
                  placeholder='Kecamatan'
                  required
                  disabled={disabled}
                />
              </Field>
              {errors.kecamatan && (
                <span className='text-sm text-red-600'>
                  {errors.kecamatan.message}
                </span>
              )}
            </div>
            {/* Skoring Power */}
            <div className='flex flex-col gap-1'>
              <Field className='flex items-start gap-3'>
                <FieldLabel htmlFor='skoring_power_stakeholder'>
                  Skoring Power
                </FieldLabel>
                <Input
                  type='number'
                  {...register('skoring_power_stakeholder', {
                    valueAsNumber: true,
                  })}
                  id='skoring_power_stakeholder'
                  placeholder='Skoring Power'
                  required
                  disabled={disabled}
                />
              </Field>
              {errors.skoring_power_stakeholder && (
                <span className='text-sm text-red-600'>
                  {errors.skoring_power_stakeholder.message}
                </span>
              )}
            </div>
            {/* Skoring Interest */}
            <div className='flex flex-col gap-1'>
              <Field className='flex items-start gap-3'>
                <FieldLabel htmlFor='skoring_interest_stakeholder'>
                  Skoring Interest
                </FieldLabel>
                <Input
                  type='number'
                  {...register('skoring_interest_stakeholder', {
                    valueAsNumber: true,
                  })}
                  id='skoring_interest_stakeholder'
                  placeholder='Skoring Interest'
                  required
                  disabled={disabled}
                />
              </Field>
              {errors.skoring_interest_stakeholder && (
                <span className='text-sm text-red-600'>
                  {errors.skoring_interest_stakeholder.message}
                </span>
              )}
            </div>
            {/* Alamat Stakeholder */}
            <div className='flex flex-col gap-1'>
              <Field className='flex items-start gap-3'>
                <FieldLabel htmlFor='alamat_stakeholder'>
                  Alamat Stakeholder
                </FieldLabel>
                <Textarea
                  {...register('alamat_stakeholder')}
                  id='alamat_stakeholder'
                  placeholder='Alamat Stakeholder'
                  required
                  disabled={disabled}
                />
              </Field>
              {errors.alamat_stakeholder && (
                <span className='text-sm text-red-600'>
                  {errors.alamat_stakeholder.message}
                </span>
              )}
            </div>
            {/* Kegiatan Stakeholder */}
            <div className='flex flex-col gap-1'>
              <Field className='flex items-start gap-3'>
                <FieldLabel htmlFor='kegiatan_stakeholder'>
                  Kegiatan Stakeholder
                </FieldLabel>
                <Textarea
                  {...register('kegiatan_stakeholder')}
                  id='kegiatan_stakeholder'
                  placeholder='Kegiatan Stakeholder'
                  required
                  disabled={disabled}
                />
              </Field>
              {errors.kegiatan_stakeholder && (
                <span className='text-sm text-red-600'>
                  {errors.kegiatan_stakeholder.message}
                </span>
              )}
            </div>
          </div>
          {/* Tindak Lanjut */}
          <div className='flex flex-col gap-1'>
            <Field className='flex items-start gap-3'>
              <FieldLabel htmlFor='tindak_lanjut_stakeholder'>
                Tindak Lanjut Stakeholder
              </FieldLabel>
              <Textarea
                {...register('tindak_lanjut_stakeholder')}
                id='tindak_lanjut_stakeholder'
                placeholder='Tindak Lanjut Stakeholder'
                required
                disabled={disabled}
              />
            </Field>
            {errors.tindak_lanjut_stakeholder && (
              <span className='text-sm text-red-600'>
                {errors.tindak_lanjut_stakeholder.message}
              </span>
            )}
          </div>
          {/* Kriteria Interest */}
          <div className='flex flex-col gap-1'>
            <div className='flex gap-3'>
              <Label className='mt-2 w-40'>Kriteria Interest</Label>
              <RadioGroup
                className='flex flex-1 gap-5'
                value={interestValue}
                onValueChange={(val) =>
                  setValue(
                    'kriteria_interest_stakeholder',
                    val as KriteriaInterestStakeholderEnum
                  )
                }
                disabled={disabled}
              >
                {Object.values(KriteriaInterestStakeholderEnum).map((v, i) => (
                  <div key={i} className='flex items-center gap-2'>
                    <RadioGroupItem value={v} id={`interest-${v}`} />
                    <Label htmlFor={`interest-${v}`}>
                      {v === KriteriaInterestStakeholderEnum.KURANG
                        ? 'Kurang Baik'
                        : v === KriteriaInterestStakeholderEnum.CUKUP
                          ? 'Cukup'
                          : 'Sangat Baik'}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {errors.kriteria_interest_stakeholder && (
              <p className='text-sm text-red-500'>
                {errors.kriteria_interest_stakeholder.message}
              </p>
            )}
          </div>

          <div className='flex justify-end gap-2 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
            >
              {disabled ? 'Tutup' : 'Batal'}
            </Button>
            {mode !== 'read' && (
              <Button type='submit'>
                {mode === 'create' ? 'Tambah Stakeholder' : 'Simpan Perubahan'}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
