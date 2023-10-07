export interface ITodayScreen {
"today_tasks": [
  {"name": string
    "status": number
    "start_time": string | null
    "stop_time": string | null
    "estimate": number},
  {"name": string
    "status": number
    "start_time": string | null
    "stop_time": string | null
    "estimate": number},
  {"name": string
    "status": number
    "start_time": string
    "stop_time": string
    "estimate": number}
  ],
  "free_tasks": [
  {"name": string
    "status": number
    "start_time": null
    "stop_time": null
    "estimate": number},
  {"name": string
    "status": number
    "start_time": string | null
    "stop_time": string | null
    "estimate": number}
  ],
  "late_tasks": [
  {"name": string
    "status": number
    "start_time": string | null
    "stop_time": string | null
    "estimate": number}
  ],
  "text_note": string
  "classes": [
  {"name": string
    "time": string
    "place": string
    "format": string},
  {"name": string
    "time": string
    "place": string
    "format": string}
  ]
}
