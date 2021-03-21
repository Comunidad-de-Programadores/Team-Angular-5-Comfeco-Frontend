import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { UpdateActiveUserId, UpdateIsDarkMode } from "./application.actions";
import { ApplicationStateModel } from "./application.model";


@State({
  name:'application',
  defaults:{
    isLoading:false,
    activeUserId:'',
    isDarkMode:false,
  }
})
@Injectable()
export class ApplicationState{

  @Selector()
  static isDarkMode(state:ApplicationStateModel){return state.isDarkMode}

  @Selector()
  static isLoading(state:ApplicationStateModel){return state.isLoading}

  @Selector()
  static getActiveUserId(state:ApplicationStateModel){return state.activeUserId}

  @Action(UpdateIsDarkMode)
  isDarkMode({getState, patchState}:StateContext<ApplicationStateModel>){
    const state = getState();
    patchState({
      isDarkMode: !state.isDarkMode
    });
  }

  @Action(UpdateIsDarkMode)
  isLoading({getState, patchState}:StateContext<ApplicationStateModel>){
    const state = getState();
    patchState({
      isLoading: !state.isLoading
    });
  }

  @Action(UpdateActiveUserId)
  updateActiveUserId({getState, patchState}:StateContext<ApplicationStateModel>,{payload}:UpdateActiveUserId){
    const state = getState();
    patchState({
      activeUserId: payload
    });
  }
}
