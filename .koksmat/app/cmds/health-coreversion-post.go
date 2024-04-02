// -------------------------------------------------------------------
// Generated by 365admin-publish
// -------------------------------------------------------------------
/*
---
title: Core Version
---
*/
package cmds

import (
	"context"

	"github.com/365admin/jumpto365-pto365/execution"
	"github.com/365admin/jumpto365-pto365/utils"
)

func HealthCoreversionPost(ctx context.Context, args []string) (*string, error) {

	result, pwsherr := execution.ExecutePowerShell("john", "*", "jumpto365-pto365", "00-health", "20-coreversion.ps1", "")
	if pwsherr != nil {
		return nil, pwsherr
	}
	utils.PrintSkip2FirstAnd2LastLines(string(result))
	return nil, nil

}
