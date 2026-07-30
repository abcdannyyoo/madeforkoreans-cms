import {defineType, defineField} from 'sanity'

export const legalDocument = defineType({
  name: 'legalDocument',
  title: 'Legal document',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      type: 'string',
      options: {
        list: [
          {title: 'Terms of Use', value: 'terms-of-use'},
          {title: 'Privacy Policy', value: 'privacy-policy'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'version',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'effectiveDate',
      type: 'datetime',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        displayTimeZone: 'Pacific/Auckland',
        allowTimeZoneSwitch: false,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {title: 'title', version: 'version', effectiveDate: 'effectiveDate'},
    prepare: ({title, version, effectiveDate}) => ({
      title: `${title} v${version}`,
      subtitle: effectiveDate,
    }),
  },
})
