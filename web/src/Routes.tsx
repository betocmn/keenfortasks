// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={ScaffoldLayout} title="Schedules" titleTo="schedules" buttonLabel="New Schedule" buttonTo="newSchedule">
        <Route path="/schedules/new" page={ScheduleNewSchedulePage} name="newSchedule" />
        <Route path="/schedules/{id}/edit" page={ScheduleEditSchedulePage} name="editSchedule" />
        <Route path="/schedules/{id}" page={ScheduleSchedulePage} name="schedule" />
        <Route path="/schedules" page={ScheduleSchedulesPage} name="schedules" />
      </Set>
      <Set wrap={ScaffoldLayout} title="Tasks" titleTo="tasks" buttonLabel="New Task" buttonTo="newTask">
        <Route path="/tasks/new" page={TaskNewTaskPage} name="newTask" />
        <Route path="/tasks/{id}/edit" page={TaskEditTaskPage} name="editTask" />
        <Route path="/tasks/{id}" page={TaskTaskPage} name="task" />
        <Route path="/tasks" page={TaskTasksPage} name="tasks" />
      </Set>
      <Route path="/home" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
