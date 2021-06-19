#screen game_side_bar():
# screen status():
#     style_prefix "status"
#     showif cheatEye:
#         imagebutton:
#             idle im.MatrixColor("images/gui/eye2.png", im.matrix.colorize("#c90","#000"))
#             hover im.MatrixColor("images/gui/eye2.png", im.matrix.colorize("#fff","#000"))
#             xalign 1.0
#             xoffset -8
#             yoffset 347
#             hovered SetVariable("cheatTemp", True)
#             unhovered SetVariable("cheatTemp", False)
#             action [ToggleVariable("cheatMenu"), ToggleVariable("cheatEvent")]
#     frame:
#         background Frame("images/gui/tframe.png", 5, 5, 5, 5)
#         xysize (480,1080)
#         xalign 1.0
#         margin (0,0)
#         padding (4,4)
#         vbox:
#             frame:
#                 xysize (472,185)
#                 margin (0,0)
#                 padding (5,5)
#                 background Null()
#                 frame:
#                     xpos 462
#                     xanchor 1.0
#                     xysize (20,20)
#                     padding(0,0)
#                     background Null()
#                     imagebutton action Show("popupMenu"):
#                         auto "images/gui/hamburger_%s.png"
#                 vbox:
#                     xpos 5
#                     hbox:
#                         text "[hour:02]:[minute:02] "
#                         if (enableSkipTime):
#                             textbutton u"\u25B6" action Jump("skipHour")
#                         else:
#                             textbutton u"\u25B6" text_hover_color "#888"
#                         text " [datestr]"
#                     hbox:
#                         vbox:
#                             xsize 226
#                             use statusItem("Satiety", "hunger")
#                             use statusItem("Mood", "fun")
#                             use statusItem("Strength", "power")
#                             if (baldDays):
#                                 use statusItem2("Haircut", "Bald", "haircut")
#                             elif (haircutDays):
#                                 text "Haircut Days: {color=#0f0}[haircutDays]"
#                             else:
#                                 use statusItem2("Haircut", "No", "haircut")
#                             if (sunburnedDays):
#                                 use statusItem2("Suntan", "Sunburn", "tan")
#                             elif (tannedDays >= 38):
#                                 text "Suntan Days: {color=#0f0}[tannedDays]"
#                             elif (tannedDays):
#                                 use statusItem2("Suntan Days", "[tannedDays]", "tan")
#                             else:
#                                 use statusItem2("Suntan", "No", "tan")
#                             if (stylishDays > 0):
#                                 text "Clothes Days: {color=#0f0}[stylishDays]"
#                             else:
#                                 hbox:
#                                     text "Stylish Clothes: {color=#f00}No"
#                                     if (cheatStats):
#                                         textbutton u" \u25B6" action Function(cheat, "clothes")
#                         vbox:
#                             xsize 226
#                             use statusItem("Money", "money")
#                             use statusItemBool("Bathed", "bathed", bathedToday or swamToday)
#                             use statusItemBool("Washed", "washed", washedToday)
#                             textbutton "Charisma: [charisma]":
#                                 text_size 20
#                                 text_color "#fff"
#                                 hovered Show("popupCharisma")
#                                 unhovered Hide("popupCharisma")
#                                 action NullAction()
#                             textbutton "Handsomeness: [beauty]":
#                                 text_size 20
#                                 text_color "#fff"
#                                 hovered Show("popupBeauty")
#                                 unhovered Hide("popupBeauty")
#                                 action NullAction()
#                             textbutton "Look: [fashion]":
#                                 text_size 20
#                                 text_color "#fff"
#                                 hovered Show("popupFashion")
#                                 unhovered Hide("popupFashion")
#                                 action NullAction()
#             frame:
#                 xysize(473, 4)
#                 background Solid("#c90")
#             hbox:
#                 xpos 5
#                 frame:
#                     background Null()
#                     xysize (226,115)
#                     vbox:
#                         use statusRel("laura")
#                         use statusRel("nanny")
#                         use statusRel("gina")
#                         use statusRel("foxy")
#                 frame:
#                     background Null()
#                     xysize (226,115)
#                     xpos 0
#                     vbox:
#                         use statusRel("nikki")
#                         use statusRel("michelle")
#                         use statusRel("caprice")
#             frame:
#                 xysize(473, 4)
#                 background Solid("#c90")
#             hbox:
#                 xpos 5
#                 frame:
#                     background Null()
#                     xysize (226,60)
#                     vbox:
#                         use statusItem("Clean Pool", "poolCleanCount")
#                         use statusItem("Clean House", "houseCleanCount")
#                 frame:
#                     background Null()
#                     xysize (226,60)
#                     xpos 0
#                     vbox:
#                         use statusItem("Play Dexter", "playDexterCount")
#                         use statusItem("Clean Dexter", "cleanDexterCount")
#             frame:
#                 xysize(473, 4)
#                 background Solid("#c90")
#             frame:
#                 xysize (472,760)
#                 background Null()

