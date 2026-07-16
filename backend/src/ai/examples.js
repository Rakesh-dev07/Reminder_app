const AI_EXAMPLES = {
    oneTime:[{
  input: "Remind me tomorrow at 7 PM to call mom",

  output: {
    title: "Call Mom",
    notes: "",
    category: "Personal",
    recurrence: {
      type: "none"
    }
  }
},{
  input: "Doctor appointment on July 20 at 3 PM",

  output: {
    title: "Doctor Appointment",
    category: "Personal",
    recurrence: {
      type: "none"
    }
  }
},{
  input: "Pay electricity bill next Friday at 6 PM",

  output: {
    title: "Pay Electricity Bill",
    category: "Other",
    recurrence: {
      type: "none"
    }
  }
}],
    daily:[{
  input: "Drink water every day at 9 AM",

  output: {
    title: "Drink Water",
    recurrence: {
      type: "daily",
      interval: 1
    }
  }
},{
  input: "Take medicine every 2 days at 8 PM",

  output: {
    title: "Take Medicine",

    recurrence: {
      type: "daily",

      interval: 2
    }
  }
},{
  input: "Meditate every morning",

  output: {

    title:"Meditate",

    missingFields:[
      "time"
    ],

    recurrence:{
      type:"daily"
    }

  }
}],
    weekly:[{
  input:"Gym every Monday at 6 AM",

  output:{
      title:"Gym",

      recurrence:{
          type:"weekly",

          interval:1,

          weekdays:[
             "Monday"
          ]
      }
  }
},{
  input:"Workout every Monday Wednesday Friday",

  output:{
      title:"Workout",

      recurrence:{
          type:"weekly",

          weekdays:[
              "Monday",
              "Wednesday",
              "Friday"
          ]
      }
  }
},{
  input:"Study every Tuesday and Thursday at 8 PM",

  output:{
      title:"Study",

      category:"Study",

      recurrence:{
          type:"weekly",

          weekdays:[
             "Tuesday",
             "Thursday"
          ]
      }
  }
}],
    monthly:[{
  input:"Pay rent every month on the 1st",

  output:{
      title:"Pay Rent",

      recurrence:{
          type:"monthly",

          monthDay:1
      }
  }
},{
  input:"Insurance payment every 2 months",

  output:{
      title:"Insurance Payment",

      recurrence:{
          type:"monthly",

          interval:2
      }
  }
}],
    yearly:[{
  input:"Mom's birthday every year",

  output:{
      title:"Mom's Birthday",

      recurrence:{
          type:"yearly"
      }
  }
},{
  input:"Renew passport every 5 years",

  output:{
      title:"Renew Passport",

      recurrence:{
          type:"yearly",

          interval:5
      }
  }
}],
    notes:[{
  input:"Call mom tomorrow at 7 PM. She'll be at work after noon.",

  output:{
      title:"Call Mom",

      notes:"She'll be at work after noon."
  }
},{
  input:"Doctor appointment next Friday. Carry previous reports.",

  output:{
      title:"Doctor Appointment",

      notes:"Carry previous reports."
  }
}],
 relativeDates: [
{
  input: "Remind me tomorrow at 8 AM to call Mom.",

  output: {
    title: "Call Mom",

    date: "2026-07-14",

    time: "08:00",

    recurrence: {
      type: "none"
    }
  }
},

{
  input: "Pay rent today at 8 PM.",

  output: {
    title: "Pay Rent",

    date: "2026-07-13",

    time: "20:00",

    recurrence: {
      type: "none"
    }
  }
},

{
  input: "Go to the gym every Monday, Wednesday and Friday from today at 5 AM.",

  output: {
    title: "Go to the gym",

    date: "2026-07-13",

    time: "05:00",

    recurrence: {
      type: "weekly",

      interval: 1,

      weekdays: [
        "Monday",
        "Wednesday",
        "Friday"
      ]
    }
  }
},

{
  input: "Doctor appointment next Friday at 3 PM.",

  output: {
    title: "Doctor Appointment",

    date: "2026-07-17",

    time: "15:00",

    recurrence: {
      type: "none"
    }
  }
},

{
  input: "Meeting the day after tomorrow at 10 AM.",

  output: {
    title: "Meeting",

    date: "2026-07-15",

    time: "10:00",

    recurrence: {
      type: "none"
    }
  }
},

{
  input: "Remind me in 2 hours to drink water.",

  output: {
    title: "Drink Water",

    date: "2026-07-13",

    time: "16:30",

    recurrence: {
      type: "none"
    }
  }
}
],
    missingFields:[{
  input:"Call Mom",

  output:{
      missingFields:[
          "date",
          "time"
      ]
  }
},{
  input:"Meeting tomorrow",

  output:{
      missingFields:[
          "time"
      ]
  }
},{
  input:"Gym every Monday",

  output:{
      missingFields:[
          "time"
      ]
  }
}],
    categories:[{
  input:"Finish React assignment tomorrow",

  output:{
      category:"Study"
  }
},{
  input:"Project meeting at 11 AM",

  output:{
      category:"Work"
  }
},{
  input:"Buy groceries tomorrow",

  output:{
      category:"Other"
  }
}],
    warnings:[{
  input:"Call mom tomorrow morning",

  output:{
      warnings:[
          "Time not specified."
      ],

      missingFields:[
          "time"
      ]
  }
},{
  input:"Pay rent sometime next month",

  output:{
      warnings:[
          "Exact date not specified."
      ],

      missingFields:[
          "date"
      ]
  }
}],
    unsupported:[{
    input:"Remind me when I reach office",

    output:{
        success:false,

        warnings:[
            "Location-based reminders are not supported."
        ]
    }
},{
    input:"Remind me if it rains tomorrow",

    output:{
        success:false,

        warnings:[
            "Conditional reminders are not supported."
        ]
    }
}]
};

export default AI_EXAMPLES;