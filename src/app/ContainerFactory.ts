import { Container } from "./Container";

export class ContainerFactory {
    
    public static createContainer(): Container {
        return new Container();
    }
}