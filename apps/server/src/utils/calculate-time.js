export function calculateTimeBetweenTwoDates (create_initial_date, create_end_date, bookings) {
  const isHaveBookingsInSameHour = bookings.filter((booking) => {
    const { ends_at, starts_at } = booking

    const starts_at_date = new Date(starts_at)
    const ends_at_date = new Date(ends_at)


    if (starts_at_date.toISOString().split('T')[0] === create_initial_date.toISOString().split('T')[0]) {
      const createInitialDateIsInSameInterval = create_initial_date >= starts_at_date && create_initial_date <= ends_at_date
      if (createInitialDateIsInSameInterval) {
        return booking
      }

      const createEndsDateIsInSameInterval = (starts_at_date < create_end_date) && create_end_date <= ends_at_date
      if (createEndsDateIsInSameInterval) {
        return booking
      }


      const haveBookingsIntoInterval = (create_initial_date < starts_at_date) && (create_end_date > ends_at_date)
      if (haveBookingsIntoInterval) {
        return booking
      }

      return 
    }
    return
  })

  return isHaveBookingsInSameHour

}