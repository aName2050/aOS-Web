import chalk from "chalk";

class Logger {
	private ErrorColor: string = "#EE000F";
	private SuccessColor: string = "#00EE00";
    private InfoColor: string = "#00AAFF";
    private ServerColor: string = "#FFAA00";
    private HTTPColor: string = "#0000FF";
    private LogColor: string = "#FFFFFF";
    
    /**
     * log
     */
    public log(type: LogType, ...args: string[]) {
        let start: string = '';
        switch (type) {
            case LogType.Log : {
                start = chalk.hex(this.LogColor).bold(' LOG ');
            }
            break;
            case LogType.Error : {
                start = chalk.hex(this.ErrorColor).bold(' ERROR ');
            }
            break;
            case LogType.HTTP : {
                start = chalk.hex(this.HTTPColor).bold(' HTTP ');
            }
            break;
            case LogType.Info : {
                start = chalk.hex(this.InfoColor).bold(' INFO ');
            }
            break;
            case LogType.Server : {
                start = chalk.hex(this.ServerColor).bold(' SERVER ');
            }
            break;
        }

        
    }
}

enum LogType {
    Log = 1,
    Error = 2,
    Info = 3,
    Server = 4,
    HTTP = 5
}

export default new Logger();
export { LogType, Logger }; 
