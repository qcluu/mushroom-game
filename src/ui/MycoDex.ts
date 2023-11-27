import Phaser from 'phaser';
import { createRoundedRectWithAlpha } from '../utils/PhaserGraphics';
import { getMushroomData } from '../utils/Shared';

export default class MycoDex extends Phaser.GameObjects.Container { 
  mushrooms = require("../data/mushroom.json");
  
  private pages: Phaser.GameObjects.Image[] = [];
  private codex: Phaser.GameObjects.Image | null = null;
  private isPagesCreated: boolean = false;
  private codexWidth: number; //will need to be responsive
  private codexHeight: number; //will need to be responsive

  private pageWidth: number; //will need to be responsive
  private pageHeight: number; //will need to be responsive
  private numPages = this.mushrooms.length;

  private page1: Phaser.GameObjects.Container;
  private page2: Phaser.GameObjects.Container;

  readonly NUM_PAGES: number= 2;

  constructor(scene: Phaser.Scene, x: number, y: number, codexPageWidth: number, codexPageHeight: number) {
    const baseCodexWidth = codexPageWidth * 2 + 20 * 2 + 20;
    const baseCodexHeight = 20 * 2 + codexPageHeight;
    
    super(scene, x - baseCodexWidth/2, y - baseCodexHeight/2)
    this.scene = scene;

    this.codexWidth = baseCodexWidth;
    this.codexHeight = baseCodexHeight;

    this.pageWidth = codexPageWidth;
    this.pageHeight = codexPageHeight;

    const bg = createRoundedRectWithAlpha(scene, 0, 0, this.codexWidth, this.codexHeight, 10, 0x422222, 1);
    this.add(bg);

    codexWidth / pageWidth
    
    for (let i = 0; i < this.NUM_PAGES; i++) {

    }
    this.page1 = new MycoPage(this.scene, 20, 20, )
    this.page2 = new MycoPage(this.scene, 20, 20, )
    
    this.page1 = this.scene.add.container(20, 20); //will need to be responsive
    this.page2 = this.scene.add.container(this.pageWidth+20+20, 20); //will need to be responsive
    
    this.add(this.page1);
    this.add(this.page2);
    
    const pageBg1 = createRoundedRectWithAlpha(scene, 0, 0, this.pageWidth, this.pageHeight, 2, 0xFFFFDD, 1)
    const pageBg2 = createRoundedRectWithAlpha(scene, 0, 0, this.pageWidth, this.pageHeight, 2, 0xFFFFDD, 1)

    this.page1.add(pageBg1)
    this.page2.add(pageBg2)

    this.setSize(this.codexWidth, this.codexHeight)
    scene.add.existing(this);

    this.initializePage(this.page1, 1);
    this.initializePage(this.page2, 2);

    // Enable input for flipping on the first page
    if (this.pages.length > 0) {
      this.pages[0].setInteractive();
      this.pages[0].on('pointerup', this.flipPage, this);
    }

    // Create and position the codex asset
    this.codex = this.scene.add.image(100, 100, 'journal');
    if (this.codex) {
      this.codex.setInteractive();
      this.codex.on('pointerup', this.toggleBookVisibility, this);
    }

    // Initially show only the first page
    if (this.pages.length > 0) {
      this.pages[0].setVisible(true);
    }

  }

  

  private flipPage = () => {
    this.pages
    const currentPageIndex = this.pages.findIndex((page) => page.visible);
    if (currentPageIndex >= 0 && currentPageIndex < this.pages.length - 1) {
      this.pages[currentPageIndex].setVisible(false);
      this.pages[currentPageIndex + 1].setVisible(true);
    }
  };

  bringToFront() {
    this.setDepth(1)
  };

  toggleBookVisibility = () => {
    this.setVisible(!this.visible)
    this.bringToFront(); 
  };
}

class MycoPage extends Phaser.GameObjects.Container {
  private mushroomGameObjects: any;

  private mushroomId: number;
  constructor(scene: Phaser.Scene, x: number, y: number, pageWidth:number, pageHeight:number) {
    super(scene, x, y);
    

    // MycoPage will hold its render gameobjects, i.e. pages and backgrounds
    this.add(bg);

    // Container within MycoPage container that stores mushroom related data
    subContainer

    this.mushroomGameObjects = [];

    initializePageBackground();
    
  }

  initializePage(page: Phaser.GameObjects.Container, id: number) {
    // TODO: Clearing the page right here
    const gameObjects = this.getAll();
    this.mushroomGameObjects.forEach(object => object.destroy());
    // End clearing page

    const mushroomData = getMushroomData(id);

    // Visualize mushroom data based on the data
    
    const textStyle = {
      fontFamily: 'Arial',
      fontSize: '32px',
      color: '#00ff00',
      fontStyle: 'bold',
      backgroundColor: '#000000',
      wordWrap: { width: this.pageWidth - 32, useAdvancedWrap: true }
  };

    // this.scene.add.image(30, 30, mushroomData["img"]);
    const textObj = this.scene.add.text(0, 0, `${mushroomData["cname"]}\n${mushroomData['sname']}\n`, textStyle);

    this.mushroomGameObjects.add(textObj);

    page.add(textObj);
  }
}