package main

import (
	"runtime/debug"
	"strings"

	"github.com/365admin/jumpto365-pto365/magicapp"
	"github.com/365admin/jumpto365-pto365/utils"
)

func main() {
	info, _ := debug.ReadBuildInfo()

	// split info.Main.Path by / and get the last element
	s1 := strings.Split(info.Main.Path, "/")
	name := s1[len(s1)-1]
	description := `---
title: jumpto365-pto365
description: Describe the main purpose of this kitchen
---

# jumpto365-pto365
`
	magicapp.Setup(".env")
	magicapp.RegisterServeCmd("jumpto365-pto365", description, "0.0.1", 8080)
	magicapp.RegisterCmds()
	magicapp.RootCmd.PersistentFlags().BoolVarP(&utils.Verbose, "verbose", "v", false, "verbose output")

	magicapp.Execute(name, "jumpto365-pto365", "")
}
