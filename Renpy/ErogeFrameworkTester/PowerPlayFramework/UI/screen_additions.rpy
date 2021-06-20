init 0 python:
    import PowerPlayFramework.Systems.Time_ControlPy as time_control
    use_status_screen_menus = False
    import renpy.exports as renpy

    class Side_Bar_Config(object):
        def __init__(self, physical_size):
            self.reset(physical_size)
        
        def reset(self, physical_size):
            xsize = physical_size[0]
            PREFERRED_SIZE = 400
            if xsize >= PREFERRED_SIZE * 3:
                self._width = PREFERRED_SIZE
            else:
                self._width = xsize//3

            ysize = physical_size[1]
            UNACCESSIBLE_VERTICAL_PIXELS = 40
            self._height = ysize -UNACCESSIBLE_VERTICAL_PIXELS

            self.frame_border_width = 5

            self.date_time_area_height = 30

            self.total_default_actions = {"LOCAL_CHARACTERS": "Characters", "LOCAL_ACTIONS": "Local Actions", "GO_SOMEWHERE_ELSE": "Go somewhere else."}
            self.expanded_default_action_id = None

            return self

        @property
        def width(self):
            return self._width
        
        @property
        def height(self):
            return self._height
        
        def show_side_bar(self):
            renpy.show_screen("game_side_bar")
        
        def expand_default_action(self, default_action_id):
            self.expanded_default_action_id = default_action_id

        def collapse_default_action(self):
            self.expanded_default_action_id = None
        
        def get_default_action_menu_items(self):
            result = []
            if self.expanded_default_action_id == "LOCAL_CHARACTERS" and current_location != None:
                for char in current_location.characters:
                    result.append((char.names.standard, "TownExplorer_Character_Interaction_Selector", char))
            elif self.expanded_default_action_id == "LOCAL_ACTIONS":
                return result
            elif self.expanded_default_action_id == "GO_SOMEWHERE_ELSE":
                return result
            else:
                return result
            return result



## Say screen ##################################################################
##
## The say screen is used to display dialogue to the player. It takes two
## parameters, who and what, which are the name of the speaking character and
## the text to be displayed, respectively. (The who parameter can be None if no
## name is given.)
##
## This screen must create a text displayable with id "what", as Ren'Py uses
## this to manage text display. It can also create displayables with id "who"
## and id "window" to apply style properties.
##
## https://www.renpy.org/doc/html/screen_special.html#say

screen say(who, what):
    style_prefix "say"

    window:
        id "window"
        xpos side_bar_config.width + 5 # for a little margin
        xalign 0.0
        # TODO: NORPUMA: Find out why we need -70 at the end of this line!!
        xsize renpy.get_physical_size()[0] - (side_bar_config.width + 5) - 70
        xfill False
        yfill False

        if who is not None:

            window:
                id "namebox"
                style "namebox"
                text who id "who"

        side "c r" :
            viewport id "say_viewport":
                xmaximum 1400
                xanchor 0.0
                xalign 0.0
                xfill True
                yfill False
                mousewheel True
                text what id "what"

            vbar value YScrollValue("say_viewport") unscrollable "hide"


    ## If there's a side image, display it above the text. Do not display on the
    ## phone variant - there's no room.
    if not renpy.variant("small"):
        add SideImage() xalign 0.0 yalign 1.0


## Make the namebox available for styling through the Character object.
init python:
    config.character_id_prefixes.append('namebox')

style window is default
style say_label is default
style say_dialogue is default
style say_thought is say_dialogue

style namebox is default
style namebox_label is say_label


style window:
    xalign 0.5
    xfill True
    yalign gui.textbox_yalign
    ysize gui.textbox_height

    background Image("gui/textbox.png", xalign=0.5, yalign=1.0)

style namebox:
    xpos gui.name_xpos
    xanchor gui.name_xalign
    xsize gui.namebox_width
    ypos gui.name_ypos
    ysize gui.namebox_height

    background Frame("gui/namebox.png", gui.namebox_borders, tile=gui.namebox_tile, xalign=gui.name_xalign)
    padding gui.namebox_borders.padding

style say_label:
    properties gui.text_properties("name", accent=True)
    xalign gui.name_xalign
    yalign 0.5

style say_dialogue:
    properties gui.text_properties("dialogue")

    xpos gui.dialogue_xpos
    xsize gui.dialogue_width
    ypos gui.dialogue_ypos

screen game_side_bar():
    style_prefix "side_bar"
    $ side_bar_config = Side_Bar_Config(renpy.get_physical_size())
    frame:
        background Frame("PowerPlayFramework/UI/gui_visual_elements/default_window_frame.png", 5, 5, 5, 5)
        xsize side_bar_config.width
        ysize side_bar_config.height
        xalign 0.0
        vbox:
            spacing 3
            xpos side_bar_config.frame_border_width
            use side_bar_date
            use side_bar_default_actions

screen side_bar_date():
    hbox:
        $ hour_to_display = time_control.time_control.hour
        $ minutes_to_display = time_control.time_control.minutes
        text "Day {0}, {1} [hour_to_display:02]:[minutes_to_display:02]".format(time_control.time_control.game_day, time_control.time_control.week_day)
    if "current_location" in globals() and current_location != None:
        hbox:
            $ location_to_display = current_location.name
            text "@ [location_to_display]" color "#129912"
    image "PowerPlayFramework/UI/gui_visual_elements/default_horizontal_separator_line.png":
        xpos -10
        xsize side_bar_config.width

screen side_bar_default_actions():
    for default_local_action_id, default_local_action_label in side_bar_config.total_default_actions.items():
        if side_bar_config.expanded_default_action_id == default_local_action_id:
            textbutton u"\u25BC [default_local_action_label]" action Function(side_bar_config.collapse_default_action)
            use side_bar_expanded_default_action(side_bar_config.get_default_action_menu_items())
        else:
            textbutton u"\u25B6 [default_local_action_label]" action Function(side_bar_config.expand_default_action, default_local_action_id)

screen side_bar_expanded_default_action(items):
    $ TEXT_HEIGHT = 20
    $ PADDING_FOR_FRAME_ELEMENTS = 12
    $ MAX_INSET_MENU_SIZE = 200
    $ menu_size = (len(items) * TEXT_HEIGHT) + PADDING_FOR_FRAME_ELEMENTS
    if menu_size > MAX_INSET_MENU_SIZE:
        $ menu_size = MAX_INSET_MENU_SIZE
    frame:
        background "#00000088"
        xsize side_bar_config.width - 15
        ysize menu_size
        side "c r" :
            viewport id "expanded_actions":
                mousewheel True
                draggable True
                frame :
                    background "#88888888"
                    use sidebar_inset_menu_choices(items)

            vbar value YScrollValue("expanded_actions") unscrollable "hide"

screen sidebar_inset_menu_choices(items):
    vbox :
        for i in items:
            textbutton i[0] action Call(i[1], i[2])

style side_bar_text:
    size gui.notify_text_size
    color "#60df8f"

style side_bar_button:
    padding (0,0)
    margin (0,0)

style side_bar_button_text:
    idle_color "#fff"
    hover_color "#f00"
    size 15

## Sidebar Menus ###############################################################
##
## This screen is used to display menus on the side bar. It is a variant on 
## renpy's standard "Choice Screen".
##
## https://www.renpy.org/doc/html/screen_special.html#choice

screen sidebar_choice(items, prompt = None):
    style_prefix "sidebar_choice"

    frame:
        background Frame("PowerPlayFramework/UI/gui_visual_elements/default_window_frame.png", 5, 5, 5, 5)
        xsize side_bar_config.width
        ypos 270
        ysize 120
        side "c r" :
            viewport id "sidebar_choice_viewport":
                xalign 0.0
                xpos 7
                yanchor 0.0
                mousewheel True
                draggable True
                vbox:
                    xalign 0.0
                    xpos 7
                    xsize side_bar_config.width
                    ypos 270
                    yanchor 0.0

                    spacing 0
                    if prompt is not None:
                            text "[prompt]" style_prefix "prompt"
                    for i in items:
                        textbutton i[0] action Return(i[1])

            vbar value YScrollValue("sidebar_choice_viewport") unscrollable "hide"

style sidebar_choice_vbox is vbox
style sidebar_choice_button is button
style sidebar_choice_button_text is button_text

style sidebar_choice_button is default:
    properties gui.button_properties("sidebar_choice_button")

style sidebar_choice_button_text is default:
    properties gui.button_text_properties("sidebar_choice_button")

style prompt_text:
    color "#ff7f50"
