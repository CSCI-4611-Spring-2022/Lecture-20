import * as gfx from './GopherGfx/GopherGfx'
import { GUI } from 'dat.gui'

export class ShadingApp extends gfx.GraphicsApp
{
    private renderStyle: string;
    private model: string;
    private lightType: string;

    private models: gfx.Mesh[];

    private gouradMaterial: gfx.GouraudMaterial;
    private wireframeMaterial: gfx.WireframeMaterial;
    private unlitMaterial: gfx.UnlitMaterial;

    private pointLight: gfx.PointLight;
    private directionalLight: gfx.DirectionalLight;

    constructor()
    {
        super();

        this.renderStyle = 'Gouraud Shading';
        this.model = 'bunny.obj';
        this.lightType = 'Point Light';
        
        this.models = [];

        this.gouradMaterial = new gfx.GouraudMaterial();
        this.wireframeMaterial = new gfx.WireframeMaterial();
        this.unlitMaterial = new gfx.UnlitMaterial();

        this.pointLight = new gfx.PointLight(new gfx.Color3(1, 1, 1));
        this.directionalLight = new gfx.DirectionalLight(new gfx.Color3(1, 1, 1))

        this.createGUI();
    }

    createScene(): void 
    {
        this.renderer.background.set(0.7, 0.7, 0.7, 1);
        const orbitCamera = new gfx.OrbitCamera(2.5);
        orbitCamera.cameraOrbitX.setRotationX(-30 * Math.PI / 180);
        orbitCamera.cameraOrbitY.setRotationY(15 * Math.PI / 180);
        orbitCamera.updateCameraOrbit();
        this.camera = orbitCamera;
        
        const ambientLight = new gfx.AmbientLight(new gfx.Color3(0.3, 0.3, 0.3));
        this.scene.add(ambientLight);

        this.pointLight.position.set(.75, 1.1, 1);
        this.scene.add(this.pointLight);

        this.directionalLight.position.set(.75, 1.1, 1)
        this.directionalLight.visible = false;
        this.scene.add(this.directionalLight);

        const lightSphere = new gfx.Sphere();
        lightSphere.scale.set(0.05, 0.05, 0.05);
        lightSphere.position.set(.75, 1.1, 1);
        this.scene.add(lightSphere);

        const lightSphereMaterial = new gfx.UnlitMaterial();
        lightSphereMaterial.color.set(1, 1, 0);
        lightSphere.material = lightSphereMaterial;

        this.gouradMaterial.ambientColor.set(1, 0.4, 0.4);
        this.gouradMaterial.diffuseColor.set(1, 0.4, 0.4);
        this.gouradMaterial.specularColor.set(1, 1, 1);
        this.gouradMaterial.shininess = 50;

        this.unlitMaterial.color.set(1, 0.4, 0.4);

        this.models.push(gfx.ObjLoader.load('./assets/bunny.obj'));
        this.models.push(gfx.ObjLoader.load('./assets/cow.obj'));
        this.models.push(gfx.ObjLoader.load('./assets/cube.obj'));
        this.models.push(gfx.ObjLoader.load('./assets/head.obj'));
        this.models.push(gfx.ObjLoader.load('./assets/hippo.obj'));
        this.models.push(gfx.ObjLoader.load('./assets/sphere.obj'));
        this.models.push(gfx.ObjLoader.load('./assets/teapot.obj',));

        this.models.forEach((model: gfx.Mesh) => {
            model.material = this.gouradMaterial;
            model.visible = false;
            this.scene.add(model);
        });

        this.models[0].visible = true;
    }

    update(deltaTime: number): void 
    {
        // Nothing to implement here 
    }

    createGUI(): void
    {
        // Create the GUI
        const gui = new GUI();
        gui.width = 200;

        const renderControls = gui.addFolder('Rendering Style');
        renderControls.open();

        const renderStyleController = renderControls.add(this, 'renderStyle', [
            'Gouraud Shading', 
            'Wireframe Shading',
            'Unlit Shading'
        ]);
        renderStyleController.name('');
        renderStyleController.onChange(()=>{this.changeRenderStyle()});

        const modelControls = gui.addFolder('Model');
        modelControls.open();

        const modelController = modelControls.add(this, 'model', [
            'bunny.obj', 
            'cow.obj',
            'cube.obj', 
            'head.obj',
            'hippo.obj',
            'sphere.obj',
            'teapot.obj'
        ]);
        modelController.name('');
        modelController.onChange(()=>{this.changeModel()});     

        const lightControls = gui.addFolder('Light');
        lightControls.open();

        const lightController = lightControls.add(this, 'lightType', [
            'Point Light',
            'Directional Light',
            'Ambient Only'
        ]);
        lightController.name('');
        lightController.onChange(()=>{this.changeLight()});
    }

    private changeRenderStyle(): void
    {
       if(this.renderStyle == 'Gouraud Shading')
       {
            this.models.forEach((model: gfx.Mesh) => {
                model.material = this.gouradMaterial;
            });
       }
       else if(this.renderStyle == 'Wireframe Shading')
       {
            this.models.forEach((model: gfx.Mesh) => {
                model.material = this.wireframeMaterial;
            });
       }
       else if(this.renderStyle == 'Unlit Shading')
       {
            this.models.forEach((model: gfx.Mesh) => {
                model.material = this.unlitMaterial;
            });
       }
    }

    private changeModel(): void
    {
        if(this.model == 'bunny.obj')
        {
            this.models.forEach((model: gfx.Mesh) => {
                model.visible = false;
            });
            this.models[0].visible = true;
        }
        else if(this.model == 'cow.obj')
        {
            this.models.forEach((model: gfx.Mesh) => {
                model.visible = false;
            });
            this.models[1].visible = true;
        }
        else if(this.model == 'cube.obj')
        {
            this.models.forEach((model: gfx.Mesh) => {
                model.visible = false;
            });
            this.models[2].visible = true;
        }
        else if(this.model == 'head.obj')
        {
            this.models.forEach((model: gfx.Mesh) => {
                model.visible = false;
            });
            this.models[3].visible = true;
        }
        else if(this.model == 'hippo.obj')
        {
            this.models.forEach((model: gfx.Mesh) => {
                model.visible = false;
            });
            this.models[4].visible = true;
        }
        else if(this.model == 'sphere.obj')
        {
            this.models.forEach((model: gfx.Mesh) => {
                model.visible = false;
            });
            this.models[5].visible = true;
        }
        else if(this.model == 'teapot.obj')
        {
            this.models.forEach((model: gfx.Mesh) => {
                model.visible = false;
            });
            this.models[6].visible = true;
        }
    }

    private changeLight(): void
    {
        if(this.lightType == 'Point Light')
        {
            this.pointLight.visible = true;
            this.directionalLight.visible = false;
        }
        else if(this.lightType == 'Directional Light')
        {
            this.pointLight.visible = false;
            this.directionalLight.visible = true;
        }
        else
        {
            this.pointLight.visible = false;
            this.directionalLight.visible = false;
        }
    }
}