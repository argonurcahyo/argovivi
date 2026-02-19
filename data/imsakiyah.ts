// Type untuk jadwal imsakiyah
export type ImsakiyahSchedule = {
  region: string
  latitude: number
  longitude: number
  timezone: string
  times: DailySchedule[]
}

export type DailySchedule = {
  date: string // YYYY-MM-DD format
  imsak: string // HH:mm
  subuh: string // HH:mm
  sunrise: string // HH:mm
  dhuhr: string // HH:mm
  ashar: string // HH:mm
  maghrib: string // HH:mm
  isha: string // HH:mm
}

// Jadwal Imsakiyah Bogor/Jakarta (Ramadan 1447H / 2026)
export const bogorImsakiyah: ImsakiyahSchedule = {
  region: 'Jakarta dan Sekitarnya',
  latitude: -6.5028,
  longitude: 106.8166,
  timezone: 'Asia/Jakarta',
  times: [
    { date: '2026-02-19', imsak: '04:31', subuh: '04:41', sunrise: '05:55', dhuhr: '12:10', ashar: '15:20', maghrib: '18:18', isha: '19:28' },
    { date: '2026-02-20', imsak: '04:32', subuh: '04:42', sunrise: '05:55', dhuhr: '12:10', ashar: '15:19', maghrib: '18:18', isha: '19:28' },
    { date: '2026-02-21', imsak: '04:32', subuh: '04:42', sunrise: '05:55', dhuhr: '12:10', ashar: '15:17', maghrib: '18:17', isha: '19:27' },
    { date: '2026-02-22', imsak: '04:32', subuh: '04:42', sunrise: '05:55', dhuhr: '12:10', ashar: '15:18', maghrib: '18:17', isha: '19:27' },
    { date: '2026-02-23', imsak: '04:32', subuh: '04:42', sunrise: '05:55', dhuhr: '12:10', ashar: '15:17', maghrib: '18:17', isha: '19:26' },
    { date: '2026-02-24', imsak: '04:32', subuh: '04:42', sunrise: '05:55', dhuhr: '12:09', ashar: '15:16', maghrib: '18:17', isha: '19:26' },
    { date: '2026-02-25', imsak: '04:32', subuh: '04:42', sunrise: '05:55', dhuhr: '12:09', ashar: '15:15', maghrib: '18:16', isha: '19:26' },
    { date: '2026-02-26', imsak: '04:32', subuh: '04:42', sunrise: '05:55', dhuhr: '12:09', ashar: '15:15', maghrib: '18:16', isha: '19:25' },
    { date: '2026-02-27', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:09', ashar: '15:14', maghrib: '18:16', isha: '19:25' },
    { date: '2026-02-28', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:09', ashar: '15:13', maghrib: '18:15', isha: '19:24' },
    { date: '2026-03-01', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:09', ashar: '15:12', maghrib: '18:15', isha: '19:24' },
    { date: '2026-03-02', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:08', ashar: '15:11', maghrib: '18:14', isha: '19:24' },
    { date: '2026-03-03', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:08', ashar: '15:10', maghrib: '18:14', isha: '19:23' },
    { date: '2026-03-04', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:08', ashar: '15:09', maghrib: '18:14', isha: '19:23' },
    { date: '2026-03-05', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:08', ashar: '15:08', maghrib: '18:13', isha: '19:22' },
    { date: '2026-03-06', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:07', ashar: '15:08', maghrib: '18:13', isha: '19:22' },
    { date: '2026-03-07', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:07', ashar: '15:09', maghrib: '18:12', isha: '19:21' },
    { date: '2026-03-08', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:07', ashar: '15:09', maghrib: '18:12', isha: '19:21' },
    { date: '2026-03-09', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:07', ashar: '15:10', maghrib: '18:12', isha: '19:20' },
    { date: '2026-03-10', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:06', ashar: '15:10', maghrib: '18:11', isha: '19:20' },
    { date: '2026-03-11', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:06', ashar: '15:10', maghrib: '18:11', isha: '19:19' },
    { date: '2026-03-12', imsak: '04:33', subuh: '04:43', sunrise: '05:55', dhuhr: '12:06', ashar: '15:11', maghrib: '18:10', isha: '19:19' },
    { date: '2026-03-13', imsak: '04:33', subuh: '04:43', sunrise: '05:54', dhuhr: '12:06', ashar: '15:11', maghrib: '18:10', isha: '19:18' },
    { date: '2026-03-14', imsak: '04:33', subuh: '04:43', sunrise: '05:54', dhuhr: '12:05', ashar: '15:11', maghrib: '18:09', isha: '19:18' },
    { date: '2026-03-15', imsak: '04:33', subuh: '04:43', sunrise: '05:54', dhuhr: '12:05', ashar: '15:12', maghrib: '18:09', isha: '19:17' },
    { date: '2026-03-16', imsak: '04:33', subuh: '04:43', sunrise: '05:54', dhuhr: '12:05', ashar: '15:12', maghrib: '18:09', isha: '19:17' },
    { date: '2026-03-17', imsak: '04:32', subuh: '04:42', sunrise: '05:54', dhuhr: '12:05', ashar: '15:12', maghrib: '18:08', isha: '19:16' },
    { date: '2026-03-18', imsak: '04:32', subuh: '04:42', sunrise: '05:54', dhuhr: '12:04', ashar: '15:12', maghrib: '18:08', isha: '19:16' },
    { date: '2026-03-19', imsak: '04:32', subuh: '04:42', sunrise: '05:54', dhuhr: '12:04', ashar: '15:13', maghrib: '18:07', isha: '19:16' },
    { date: '2026-03-20', imsak: '04:32', subuh: '04:42', sunrise: '05:54', dhuhr: '12:04', ashar: '15:13', maghrib: '18:07', isha: '19:15' },
  ]
}

// Jadwal Imsakiyah Brisbane (Ramadan 1447H / 2026)
export const brisbaneImsakiyah: ImsakiyahSchedule = {
  region: 'Brisbane, Australia',
  latitude: -27.4698,
  longitude: 153.0251,
  timezone: 'Australia/Brisbane',
  times: [
    { date: '2026-02-19', imsak: '04:12', subuh: '04:12', sunrise: '05:32', dhuhr: '12:02', ashar: '15:35', maghrib: '18:11', isha: '19:39' },
    { date: '2026-02-20', imsak: '04:12', subuh: '04:12', sunrise: '05:32', dhuhr: '12:02', ashar: '15:39', maghrib: '18:20', isha: '19:40' },
    { date: '2026-02-21', imsak: '04:14', subuh: '04:14', sunrise: '05:31', dhuhr: '12:02', ashar: '15:39', maghrib: '18:20', isha: '19:40' },
    { date: '2026-02-22', imsak: '04:15', subuh: '04:15', sunrise: '05:31', dhuhr: '12:02', ashar: '15:39', maghrib: '18:20', isha: '19:39' },
    { date: '2026-02-23', imsak: '04:13', subuh: '04:13', sunrise: '05:35', dhuhr: '12:02', ashar: '15:39', maghrib: '18:27', isha: '19:51' },
    { date: '2026-02-24', imsak: '04:17', subuh: '04:17', sunrise: '05:36', dhuhr: '12:02', ashar: '15:44', maghrib: '18:28', isha: '19:52' },
    { date: '2026-02-25', imsak: '04:18', subuh: '04:18', sunrise: '05:37', dhuhr: '12:02', ashar: '15:39', maghrib: '18:35', isha: '19:41' },
    { date: '2026-02-26', imsak: '04:18', subuh: '04:18', sunrise: '05:37', dhuhr: '12:01', ashar: '15:33', maghrib: '18:39', isha: '19:40' },
    { date: '2026-02-27', imsak: '04:20', subuh: '04:20', sunrise: '05:38', dhuhr: '12:01', ashar: '15:28', maghrib: '18:43', isha: '19:32' },
    { date: '2026-02-28', imsak: '04:30', subuh: '04:30', sunrise: '05:38', dhuhr: '12:01', ashar: '15:23', maghrib: '18:52', isha: '19:32' },
    { date: '2026-03-01', imsak: '04:31', subuh: '04:31', sunrise: '05:38', dhuhr: '12:01', ashar: '15:19', maghrib: '18:51', isha: '19:30' },
    { date: '2026-03-02', imsak: '04:02', subuh: '04:02', sunrise: '05:40', dhuhr: '12:01', ashar: '15:19', maghrib: '18:50', isha: '19:30' },
    { date: '2026-03-03', imsak: '04:02', subuh: '04:02', sunrise: '05:41', dhuhr: '12:01', ashar: '15:14', maghrib: '18:49', isha: '19:29' },
    { date: '2026-03-04', imsak: '04:35', subuh: '04:35', sunrise: '05:41', dhuhr: '12:00', ashar: '15:11', maghrib: '18:48', isha: '19:28' },
    { date: '2026-03-05', imsak: '04:29', subuh: '04:29', sunrise: '05:09', dhuhr: '12:00', ashar: '15:11', maghrib: '18:17', isha: '19:39' },
    { date: '2026-03-06', imsak: '04:26', subuh: '04:26', sunrise: '05:42', dhuhr: '12:00', ashar: '15:06', maghrib: '18:38', isha: '19:31' },
    { date: '2026-03-08', imsak: '04:36', subuh: '04:36', sunrise: '05:03', dhuhr: '11:59', ashar: '15:30', maghrib: '18:14', isha: '19:39' },
    { date: '2026-03-09', imsak: '04:27', subuh: '04:27', sunrise: '05:44', dhuhr: '11:59', ashar: '15:09', maghrib: '18:13', isha: '19:27' },
    { date: '2026-03-10', imsak: '04:27', subuh: '04:27', sunrise: '05:45', dhuhr: '11:59', ashar: '15:29', maghrib: '18:52', isha: '19:26' },
    { date: '2026-03-11', imsak: '04:28', subuh: '04:28', sunrise: '05:45', dhuhr: '11:59', ashar: '15:29', maghrib: '18:51', isha: '19:25' },
    { date: '2026-03-12', imsak: '04:28', subuh: '04:28', sunrise: '05:46', dhuhr: '11:56', ashar: '15:08', maghrib: '18:10', isha: '19:39' },
    { date: '2026-03-13', imsak: '04:38', subuh: '04:38', sunrise: '05:46', dhuhr: '11:38', ashar: '15:27', maghrib: '18:08', isha: '19:39' },
    { date: '2026-03-14', imsak: '04:30', subuh: '04:30', sunrise: '05:47', dhuhr: '11:38', ashar: '15:27', maghrib: '18:08', isha: '19:21' },
    { date: '2026-03-15', imsak: '04:31', subuh: '04:31', sunrise: '05:47', dhuhr: '11:38', ashar: '15:08', maghrib: '18:08', isha: '19:20' },
    { date: '2026-03-16', imsak: '04:32', subuh: '04:32', sunrise: '05:48', dhuhr: '11:57', ashar: '15:06', maghrib: '18:05', isha: '19:18' },
    { date: '2026-03-17', imsak: '04:32', subuh: '04:32', sunrise: '05:49', dhuhr: '11:57', ashar: '15:25', maghrib: '18:04', isha: '19:18' },
    { date: '2026-03-18', imsak: '04:33', subuh: '04:33', sunrise: '05:49', dhuhr: '11:57', ashar: '15:25', maghrib: '18:03', isha: '19:18' },
    { date: '2026-03-19', imsak: '04:35', subuh: '04:35', sunrise: '05:50', dhuhr: '11:56', ashar: '15:23', maghrib: '18:01', isha: '19:16' },
    { date: '2026-03-20', imsak: '04:36', subuh: '04:36', sunrise: '05:30', dhuhr: '11:56', ashar: '15:23', maghrib: '18:01', isha: '19:13' },
    { date: '2026-03-21', imsak: '04:36', subuh: '04:36', sunrise: '05:51', dhuhr: '11:36', ashar: '15:23', maghrib: '18:00', isha: '19:13' },
  ]
}
