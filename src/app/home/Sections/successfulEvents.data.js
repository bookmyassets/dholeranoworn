const novemberGallery = '/events/gurgaon-november-2026'
const chandigarhGallery = '/events/chandigarh-november-2025'

// Newest first so the showcase opens with the latest event.
const successfulEvents = [
  {
    id: 'gurgaon-november-2026',
    title: 'Dholera Event in Gurgaon',
    date: { value: '2026-11-21', label: '21' },
    endDate: { value: '2026-11-22', label: '22 November 2026' },
    venue: 'Sector 48, Gurugram',
    media: [
      {
        type: 'photo',
        src: `${novemberGallery}/investor-presentation.webp`,
        alt: 'A presenter shows a Dholera map to attendees gathered around a table.',
        position: 'center 65%'
      },
      {
        type: 'photo',
        src: `${novemberGallery}/table-discussion.webp`,
        alt: 'Three attendees talk around a table at the Gurgaon event.'
      },
      {
        type: 'photo',
        src: `${novemberGallery}/group-photo.webp`,
        alt: 'Four people pose together holding a box of sweets.'
      },
      {
        type: 'photo',
        src: `${novemberGallery}/attendee-photo.webp`,
        alt: 'Four attendees hold an orange presentation box.'
      },
      {
        type: 'video',
        src: `${novemberGallery}/gurgaon-event.mp4`,
        poster: `${novemberGallery}/video-poster.webp`,
        label: 'Dholera Gurgaon event video'
      }
    ],
    description:
      'The Dholera Now or Never event brought people together to explore Dholera Smart City, its latest developments, investment opportunities, upcoming infrastructure and future growth. Attendees also met our on-ground team to learn more about opportunities in Dholera.'
  },
  {
    id: 'gurugram-august-2026',
    title: 'Dholera Investor Meet – Gurgaon',
    date: { value: '2026-08-08', label: '8 August 2026' },
    venue: 'Sector 48, Gurugram',
    description:
      "An investor meetup covering Dholera's infrastructure development, residential plot opportunities, property documentation and long-term investment considerations.",
    collaboration: 'BookMyAssets and Dholera: Now or Never'
  },
  {
    id: 'chandigarh-november-2025',
    title: 'Dholera Now or Never – Chandigarh Investor Meet',
    date: { value: '2025-11-15', label: '15 November 2025' },
    venue: 'Mercure Hotel, Chandigarh',
    media: [
      {
        type: 'photo',
        src: `${chandigarhGallery}/map-presentation.webp`,
        alt: 'A presenter holds up a Dholera map for attendees seated around a table.',
        position: '65% 45%'
      },
      {
        type: 'photo',
        src: `${chandigarhGallery}/table-consultation.webp`,
        alt: 'A presenter sits across from two attendees with a map on the table.'
      },
      {
        type: 'photo',
        src: `${chandigarhGallery}/group-discussion.webp`,
        alt: 'Attendees in conversation around a table at the Chandigarh meetup.'
      },
      {
        type: 'photo',
        src: `${chandigarhGallery}/attendee-conversation.webp`,
        alt: 'Three attendees talk beside a glass wall at the Chandigarh meetup.'
      },
      {
        type: 'photo',
        src: `${chandigarhGallery}/welcome-desk.webp`,
        alt: 'A guest speaks with two people at a desk with Dholera brochures.'
      }
    ],
    description:
      "An investor meetup introducing prospective buyers to Dholera's development roadmap, land opportunities, property documentation and investment considerations."
  }
]

export default successfulEvents
