import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'brief',
  title: 'Brief',
  type: 'document',
  groups: [
    {name: 'source', title: 'Source'},
    {name: 'media', title: 'Media'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Korean headline. Lead with the felt impact, not the bare number.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'titleEn',
      title: 'Title En',
      description:
        'Short English phrase used to generate the URL slug, e.g. "IR3 tax deadline July 2026". Not shown to readers.',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'titleEn', maxLength: 96},
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: '한 줄 요약 (2-3 sentences max). Used on cards and in the roundup.',
      type: 'text',
    }),
    defineField({
      name: 'mustDo',
      title: 'Must Do',
      description: 'The single most important action line. Optional but preferred.',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: `Full brief in markdown (핵심 수치 / 무엇이 달라졌나 / 우리 집엔 무슨 의미 / 지금 할 일). Paste directly from the brief-writer skill's draft — plain markdown for now, not rich text.`,
      type: 'blockContent',
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'reference',
      to: [{type: 'topic'}],
      validation: (Rule) => Rule.required(),
    }),

    /* Source */
    defineField({
      name: 'publisher',
      title: 'Publisher',
      description: 'The body that published this. Reused across briefs.',
      type: 'reference',
      to: [{type: 'publisher'}],
      group: 'source',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      description: 'The specific page on the publisher’s site. Unique to this brief.',
      type: 'url',
      group: 'source',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      description: 'The source release date',
      type: 'datetime',
      group: 'source',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        displayTimeZone: 'Pacific/Auckland',
        allowTimeZoneSwitch: false,
      },
    }),
    defineField({
      name: 'deadline',
      title: 'Deadline',
      description: 'Only set if the item has a real action deadline or effective date.',
      type: 'datetime',
      group: 'source',
      options: {
        dateFormat: 'DD-MM-YYYY',
        timeFormat: 'HH:mm',
        displayTimeZone: 'Pacific/Auckland',
        allowTimeZoneSwitch: false,
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      publisher: 'publisher.shortName',
      publishedAt: 'publishedAt',
    },
    prepare({title, publisher, publishedAt}) {
      const date = publishedAt
        ? new Intl.DateTimeFormat('en-NZ', {
            timeZone: 'Pacific/Auckland',
            dateStyle: 'medium',
          }).format(new Date(publishedAt))
        : null
      return {
        title,
        subtitle: [publisher, date].filter(Boolean).join(' · '),
      }
    },
  },
})
