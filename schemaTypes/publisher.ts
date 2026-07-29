import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'publisher',
  title: 'Publisher',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      description: 'e.g. Inland Revenue Department.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortName',
      title: 'Abbreviation',
      description: 'e.g. IRD, Stats NZ, RBNZ.',
      type: 'string',
    }),
    defineField({
      name: 'homepage',
      title: 'Homepage',
      type: 'url',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
  ],
  preview: {
    select: {title: 'shortName', subtitle: 'fullName'},
  },
})
