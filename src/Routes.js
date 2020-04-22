import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,

  WorkoutSessionEdit as WorkoutSessionEditView,
  WorkoutSessionList as WorkoutSessionListView,
  WorkoutSessionDetail as WorkoutSessionDetailView,

  SporterDetail as SporterDetailView,
  SporterList as SporterListView,
  SporterListByTrainer as SporterListByTrainerView,
  //Typography as TypographyView,
  //Icons as IconsView,
  Account as AccountView,
  //Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,

  ExerciseList as ExerciseListView,
  ExerciseEdit as ExerciseEditView,
  ExerciseDetail as ExerciseDetailView,

  WorkoutProgramDetail as WorkoutProgramDetailView,
  WorkoutProgramEdit as WorkoutProgramEditView,
  WorkoutProgramList as WorkoutProgramListView
} from './pages';

const Routes = () => {
  return (

    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={SporterListByTrainerView}
        exact
        layout={MainLayout}
        path="/sporters"
      />
      <RouteWithLayout
        component={SporterDetailView}
        exact
        layout={MainLayout}
        path="/sporters/detail/:id"
      />
      <RouteWithLayout
        component={SporterListView}
        exact
        layout={MainLayout}
        path="/invite/sporters"
      />
      <RouteWithLayout
        component={SporterListView}
        exact
        layout={MainLayout}
        path="/feedbacks"
      />
      <RouteWithLayout
        component={WorkoutSessionListView}
        exact
        layout={MainLayout}
        path="/workoutsessions"
      />
      <RouteWithLayout
        component={WorkoutSessionEditView}
        exact
        layout={MainLayout}
        path="/workoutsessions/create"
      />

      <RouteWithLayout
        component={WorkoutSessionEditView}
        exact
        layout={MainLayout}
        path="/workoutsessions/edit/:id"
      />

      <RouteWithLayout
        component={WorkoutSessionDetailView}
        exact
        layout={MainLayout}
        path="/workoutsessions/detail/:id"
      />

      {/* exercises pages */}
      <RouteWithLayout
        component={ExerciseListView}
        exact
        layout={MainLayout}
        path="/exercises"
      />
      <RouteWithLayout
        component={ExerciseEditView}
        exact
        layout={MainLayout}
        path="/exercises/create"
      />

      <RouteWithLayout
        component={ExerciseEditView}
        exact
        layout={MainLayout}
        path="/exercises/edit/:id"
      />

      <RouteWithLayout
        component={ExerciseDetailView}
        exact
        layout={MainLayout}
        path="/exercises/detail/:id"
      />

      <RouteWithLayout
        component={WorkoutProgramListView}
        exact
        layout={MainLayout}
        path="/workoutprograms"
      />
      <RouteWithLayout
        component={WorkoutProgramEditView}
        exact
        layout={MainLayout}
        path="/workoutprograms/create"
      />

      <RouteWithLayout
        component={WorkoutProgramEditView}
        exact
        layout={MainLayout}
        path="/workoutprograms/edit/:id"
      />

      <RouteWithLayout
        component={WorkoutProgramDetailView}
        exact
        layout={MainLayout}
        path="/workoutprograms/detail/:id"
      />

      {/* <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      /> */}
      {/* <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      /> */}
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      {/* <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      /> */}
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />

      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-out"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
