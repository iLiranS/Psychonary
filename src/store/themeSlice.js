import { createSlice } from "@reduxjs/toolkit";

const bg1 = 'https://wallpaperaccess.com/full/84248.png'
const bg2 = 'https://images.hdqwalls.com/wallpapers/desert-night-minimal-4k-hp.jpg'
const bg3 = 'https://images.alphacoders.com/693/693912.png'
const bg4 = 'https://images.unsplash.com/photo-1554502785-b8b0724b4cbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80';
const bg5 = 'https://wallpapercave.com/wp/wp4676613.png';
const bg6 = 'https://wallpaperaccess.com/full/439756.jpg'

const themeSlice = createSlice({
    name : 'theme',
    initialState : {liveChatOpen:false,settingsOpen:false,listOpen:false,bg:bg1,cardBg:'#a7abe8',textColor:'#ffffff',},
    reducers:{
        toggleList(state){
            if (!state.listOpen){
                state.listOpen = true ;
                state.settingsOpen = false;
                state.liveChatOpen=false;
            }
            else {
                state.listOpen = false ;
            }
        },
        toggleSettings(state){
            if (!state.settingsOpen){
                state.settingsOpen = true ;
                state.listOpen = false;
                state.liveChatOpen=false;
            }
            else {
                state.settingsOpen = false ;
            }
        },
        toggleLiveChat(state){
            if (!state.liveChatOpen){
                state.settingsOpen = false ;
                state.listOpen = false;
                state.liveChatOpen=true;
            }
            else {
                state.liveChatOpen = false ;
            }
        },
        disableAll(state){
            state.settingsOpen = false;
            state.listOpen = false;
            state.liveChatOpen=false;
        },
        updateTheme(state,action){
            if (!action.payload){
                state.bg = bg1;
                state.cardBg = '#a7abe8';
                state.textColor ='#ffffff';
                const theme = {bg:bg1,cardBg:'#a7abe8',textColor:'#ffffff'};
                localStorage.setItem('theme',JSON.stringify(theme));

                return;
            }
            // need bg , cardBg and textColor
            if (action.payload.bg){
                const b = action.payload.bg;
                switch (b){
                    case 1:
                        state.bg = bg1;
                        break;
                    case 2:
                        state.bg = bg2;
                        break;
                    case 3:
                        state.bg = bg3;
                        break;
                    case 4:
                        state.bg = bg4;
                        break;
                    case 5:
                        state.bg=bg5;
                        break;
            
                     case 6:
                        state.bg=bg6;
                        break;

                        default:
                            state.bg=b;
                }
            }
            state.cardBg = action.payload.cardBg;
            state.textColor = action.payload.textColor;
            const theme = {bg:state.bg,cardBg:state.cardBg,textColor:state.textColor};
            localStorage.setItem('theme',JSON.stringify(theme));

        }
    }
})
export const themeActions = themeSlice.actions;
export default themeSlice.reducer;